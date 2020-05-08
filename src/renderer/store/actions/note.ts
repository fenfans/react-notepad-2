import TYPES from './type'
import NoteFetcher from '../../service/note'
const uuidv1 = require('uuid/v1');

import dirtyUpdate from '../../util/dirtyUpdate'

export function getList() {
    return (dispatch) => {
        return NoteFetcher.getList().then((res: {count: number; rows: any[]}) => {
            const {count, rows} = res
            dispatch({
                type: TYPES.GET_NOTES,
                data: rows
            })
        })
    }
}

export function addNote(params: {title: string; content: string}) {
    return (dispatch) => {
        const note =  {
            id: uuidv1(),
            ...params,
            tag: 'add',
            lastModify: new Date()
        }
        dirtyUpdate.pushUpdate([note])
        dispatch({
            type: TYPES.ADD_NOTE,
            data: note
        })

        // return NoteFetcher.addNote(params).then((res) => {
        //     debugger
        // })
    }
}
export function updateNote(params: {id: string; title: string; content: string}) {
    return (dispatch) => {
        const note =  {
            ...params,
            tag: 'update',
            lastModify: new Date()
        }
        dirtyUpdate.pushUpdate([note])
        dispatch({
            type: TYPES.UPDATE_NOTE,
            data: note
        })
        // return NoteFetcher.updateNote(params).then((res) => {
        //     debugger
        // })
    }
}
export function deleteNote(params: {id: string;}) {
    return (dispatch) => {
        const note =  {
            ...params,
            tag: 'delete'
        }
        dirtyUpdate.pushUpdate([note])
        dispatch({
            type: TYPES.DELETE_NOTE,
            data: note
        })
    }
}