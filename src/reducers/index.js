// import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
// import { handleActions } from 'redux-actions';
// import { reducer as formReducer } from 'redux-form';
// import * as actions from '../actions';

const channels = (state = {}, action) => state;
const messages = (state = {}, action) => state;
const currentChannelId = (state = {}, action) => state;

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
