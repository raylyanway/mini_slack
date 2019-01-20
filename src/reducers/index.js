// import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);

const currentChannelId = handleActions({
  [actions.chooseChannel](state, { payload }) {
    return payload;
  },
}, 1);

const modal = handleActions({
  [actions.modalClose](state, { payload }) {
    return { ...state, modalShow: payload };
  },
  [actions.modalOpen](state, { payload: { modalShow, headerTitle, body } }) {
    return {
      ...state,
      modalShow,
      headerTitle,
      body,
    };
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
  modal,
});
