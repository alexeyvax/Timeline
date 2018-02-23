import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import store from './store/store';
import App from './containers/App';
import Auth from './containers/Auth';
import Swagger from './components/Swagger/Swagger.jsx';
import './theme.css';

const session = sessionStorage.getItem('user');
Notification.requestPermission();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        {(!session && window.location.pathname !== '/auth')
          && <Redirect path='/' to='/auth' />}
        {(session && window.location.pathname !== '/swagger')
          && <Redirect path='/' to='/protected' />}
        <Route path='/auth' component={Auth} />
        <Route path='/protected' component={App} />
        <Route path='/swagger' component={Swagger} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
