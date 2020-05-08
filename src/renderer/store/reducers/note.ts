import ACTION_TYPE from '../actions/type';
import { defaultState } from '../state';

export default (state = defaultState.note, action) => {
  const { type, data } = action;
  const {dataSource = new Map() } = state;
  switch (type) {
    case ACTION_TYPE.GET_NOTES:
      data.forEach(item => {
        dataSource.set(item.id, item)
      })
      // 合并本地未提交的数据
      const localUpdate =JSON.parse(localStorage.getItem('noteUpdates')) || []
      localUpdate.forEach(u => {
        const [id, data] = u
        if (id) {
          if(data.tag === 'delete') {
            dataSource.delete(id)
          } else {
            dataSource.set(id, data)
          }
        }
      })
      return {
        ...state,
        dataSource: new Map(dataSource)
      };
    case ACTION_TYPE.ADD_NOTE:
      dataSource.set(data.id, data)
      return {
        ...state,
        dataSource: new Map(dataSource)
      };
    case ACTION_TYPE.UPDATE_NOTE:
      dataSource.set(data.id, data)
      return {
        ...state,
        dataSource: new Map(dataSource)
      };
    case ACTION_TYPE.DELETE_NOTE:
      dataSource.delete(data.id)
      return {
        ...state,
        dataSource: new Map(dataSource)
      };
    default:
      return {
        ...state
      };
  }
};