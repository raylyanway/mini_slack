import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '../assets/images/favicon.ico';
import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
// import io from 'socket.io-client';
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const initState = state => ({ ...state });

let userName = Cookies.get('userName');

if (userName === undefined) {
  userName = faker.name.findName();
  Cookies.set('userName', userName);
}

const UserNameContext = React.createContext(userName);

const store = createStore(
  reducers,
  initState(gon),
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

render(
  <Provider store={store}>
    <UserNameContext.Provider>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
