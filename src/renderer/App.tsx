import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history';

import {AppRouter} from './router'


import store from 'store';
const logo = require('./logo.svg');
// import Main from './component/Main';
import './App.css';
export const history = createHistory({
});
class App extends Component {
  render() {
    return (
      <Provider store={store} history={history}>
          <BrowserRouter>
            <AppRouter/>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
