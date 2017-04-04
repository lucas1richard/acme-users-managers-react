import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Main from './react/Main';
import Home from './react/Home';
import Users from './react/Users';

const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Main }>
      <IndexRoute component={ Home } />
      <Route path="/users" component={ Users } />
      <Route path="/users/edit" component={ Users } />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
