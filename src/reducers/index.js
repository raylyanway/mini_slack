// import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = (state = {}) => state;

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);

const currentChannelId = handleActions({
  [actions.chooseChannel](state, { payload }) {
    return payload;
  },
}, 1);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
