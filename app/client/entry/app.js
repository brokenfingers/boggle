import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from '../components/page/home';
import Main from '../components/page/main';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import combinedReducers from '../reducers/combined_reducers';

const store = createStore(
  combinedReducers,
  applyMiddleware(
    thunkMiddleware
  )
);

function mountApp(id) {
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/play' component={Main} />
      </Router>
    </Provider>,
    document.getElementById(id)
  );
}

window.mountApp = mountApp;
