import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './page/Home';
import Add from './page/Add'
// import ReviewRankList from './page/Home';

export const ROUTER_CONFIG = [
{
  id: 'home',
  path: '/',
  exact: true,
  title: '首页',
  // icon: 'api',
  component: Home
}, 
{
  id: 'add',
  path: '/add',
  exact: true,
  title: '新增',
  // icon: 'star',
  component: Add,
}
]

const routes = [];

prepareRoute(ROUTER_CONFIG, routes);

function prepareRoute(routerConfigs, routes) {
  routerConfigs.forEach((routerConfig) => {
    if (routerConfig.children) {
      prepareRoute(routerConfig.children, routes)
    } else {
      routes.push(
        <Route path={routerConfig.path} component={routerConfig.component} key={routerConfig.id} exact={!!routerConfig.exact} />
      );
    }
  })
}

export const AppRouter = () => {
  return (
    <Switch>
      {routes}
      <Route
				key={"404notfound"}
				path={"*"}
				exact={true}
			  component={() => <div>not found</div>}
			/>
    </Switch>
  );
}
