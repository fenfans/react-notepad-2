import debounce from 'lodash/debounce'
import noteService from '../service/note';
import ACTION_TYPE from '../store/actions/type';
class DirtyUpdate {
    updates: Map<string, any>
    nextUpdates: Map<string, any>
    isCommitting: boolean
    depActions
    constructor(depActions) {
        const localUpdate = JSON.parse(localStorage.getItem('noteUpdates')) || [] 
        this.depActions = depActions
        this.updates = new Map()
        this.nextUpdates = new Map(localUpdate)
        this.isCommitting = false
    }
    pushUpdate(updates = []) {
        updates.forEach(u => {
            let {id, tag} = u
            // add -> add = add
            // add -> update = add
            // add -> del = null
            // update -> update = update
            // update -> del = del

            if (this.nextUpdates.has(id)) {
                const oldTag =  this.nextUpdates.get(id).tag
                if (oldTag === 'add' && tag === 'update') tag = 'add'
                if (oldTag === 'add' && tag === 'del') id = null
            }
            try {
                if (id) {
                    this.nextUpdates.set(id, {...u, tag})
                } else {
                    this.nextUpdates.delete(id,)
                }
            } catch(e) {
             console.log("DirtyUpdate -> pushUpdate -> e", e)
            }

        })
        // 同步到本地
        localStorage.setItem('noteUpdates', JSON.stringify([...this.nextUpdates.entries()]))
    }
    syncToServer = debounce(() =>  {
        this.isCommitting = true
        this.updates = new Map(this.nextUpdates)
        this.nextUpdates = new Map()
        return noteService.syncToServer([...this.updates.values()]).then(res => {
            localStorage.setItem('noteUpdates', JSON.stringify([...this.nextUpdates.entries()]))
            return res
        }).catch(e => {
            this.mergeFailUpdates()
            return Promise.reject()
        })
    }, 1000)
    mergeFailUpdates() {
        for (let [k, v] of this.updates) {
            this.nextUpdates.set(k, v)
        }
        localStorage.setItem('noteUpdates', JSON.stringify([...this.nextUpdates.entries()]))
    }
    // syncToLocal() {
    //     noteService.getList()
    // }
}

const dirtyUpdate = new DirtyUpdate([ACTION_TYPE.ADD_NOTE, ACTION_TYPE.DELETE_NOTE, ACTION_TYPE.UPDATE_NOTE])

export { dirtyUpdate }
export default dirtyUpdate