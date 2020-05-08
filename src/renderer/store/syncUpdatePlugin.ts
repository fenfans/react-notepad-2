

export default function(dirtyUpdate) {
    return (store) => {
        return next => action => {
            if ((dirtyUpdate.depActions || []).indexOf(action.type) > -1) {
                console.log("syncUpdatePlugin -> action", action)
                dirtyUpdate.syncToServer()
            }
            return next(action)
        } 
    }
}