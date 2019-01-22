// import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
  [actions.deleteChannelSuccess](state, { payload: { id } }) {
    const newState = state.filter(m => m.channelId !== id);
    return [...newState];
  },
}, []);

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
  [actions.deleteChannelSuccess](state, { payload: { id } }) {
    const newState = state.filter(c => c.id !== id);
    return [...newState];
  },
  [actions.editChannelSuccess](state, { payload: { attributes, id } }) {
    const editChannel = state.find(c => c.id === id);
    editChannel.name = attributes.name;
    return [...state];
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
  [actions.modalOpen](state, {
    payload: data,
  }) {
    return { ...state, ...data };
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
  modal,
});
