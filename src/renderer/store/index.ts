import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'

import syncUpdatePlugin from './syncUpdatePlugin'

import dirtyUpdate from '../util/dirtyUpdate'

import reducers from './reducers';


const store = createStore(
  reducers as any,
  applyMiddleware(
    thunk,
    syncUpdatePlugin(dirtyUpdate)
  )
);

export default store;
