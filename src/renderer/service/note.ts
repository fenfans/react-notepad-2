import util from './util';

export interface Note {
    id: string;
    title: string;
    content?: string;
    createdAt: string|number;
    updatedAt: string|number;

}

export default {
  getList(): Promise<{count: number; totalPage: number; rows: Note[]}> {
    return util.fetch('api/note', {
      method: 'POST',
      // data: params
    }).catch(e => {
      return Promise.reject(e)
    });
  },

  queryDetail(params: {id: string;}): Promise<any> {
    return util.fetch('api/queryDetail', {
        method: 'POST',
        data: params,
    }).catch(e => {
      return Promise.reject(e)
    })
  },

  addNote(params: {title: string; content?: string}): Promise<any> {
    return util.fetch('api/addNote', {
        method: 'POST',
        data: params,
    }).catch(e => {
      return Promise.reject(e)
    })
  },

  updateNote(params: {id: string; title: string; content?: string}): Promise<any> {
    return util.fetch(`api/updateNote`, {
        method: 'POST',
        data: params,
    }).catch(e => {
      return Promise.reject(e)
    })
  },

  deleteNote(id) {
    return util.fetch(`api/deleteNote/${id}`, {
      method: 'DELETE'
    }).catch(e => {
      return Promise.reject(e)
    })
  },

  syncToServer(params) {
    return util.fetch(`api/sync`, {
      method: 'POST',
      data: params
    }).catch(e => {
      return Promise.reject(e)
    })
  }
};
