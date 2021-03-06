import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '../assets/images/favicon.ico';
import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { keyBy } from 'lodash';
import reducers from './reducers';
import App from './components/App';
import * as actions from './actions';
import UserNameContext from './context';

library.add(faCog);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const initState = state => ({
  ...state,
  channels: keyBy(state.channels, 'id'),
  messages: keyBy(state.messages, 'id'),
});

let userName = Cookies.get('userName');

if (userName === undefined) {
  userName = faker.name.findName();
  Cookies.set('userName', userName);
}

const store = createStore(
  reducers,
  initState(gon),
  compose(composeWithDevTools(applyMiddleware(thunk))),
);

const socket = io();
socket.on('newMessage', (res) => {
  store.dispatch(actions.addMessageSuccess(res.data));
});
socket.on('newChannel', (res) => {
  store.dispatch(actions.addChannelSuccess(res.data));
});
socket.on('removeChannel', (res) => {
  store.dispatch(actions.deleteChannelSuccess(res.data));
});
socket.on('renameChannel', (res) => {
  store.dispatch(actions.editChannelSuccess(res.data));
});

render(
  <Provider store={store}>
    <UserNameContext.Provider value={userName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
