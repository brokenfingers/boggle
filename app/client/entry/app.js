import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from '../components/page/home';

function mountApp(id) {
  render(
    <Router history={browserHistory}>
      <Route path='/' component={Home} />
    </Router>,
    document.getElementById(id)
  );
}

window.mountApp = mountApp;
