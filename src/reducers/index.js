import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { omitBy, omit } from 'lodash';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { attributes, id } }) {
    return { ...state, [id]: attributes };
  },
  [actions.deleteChannelSuccess](state, { payload: { id } }) {
    const newState = omitBy(state, m => m.channelId === id);
    return { ...newState };
  },
}, {});

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { attributes, id } }) {
    return { ...state, [id]: attributes };
  },
  [actions.deleteChannelSuccess](state, { payload: { id } }) {
    const newState = omit(state, id);
    return { ...newState };
  },
  [actions.editChannelSuccess](state, { payload: { attributes: { name }, id } }) {
    return { ...state, [id]: { ...state[id], name } };
  },
}, {});

const currentChannelId = handleActions({
  [actions.chooseChannel](state, { payload }) {
    return payload;
  },
}, 1);

const modal = handleActions({
  [actions.modalClose]() {
    const newState = {
      id: 1,
      modalShow: false,
      body: '',
      headerTitle: '',
      type: null,
      channelId: null,
      channelName: null,
    };

    return { ...newState };
  },
  [actions.modalEdit](state, { payload: data }) {
    const newState = {
      modalShow: true,
      headerTitle: 'Edit channel',
      type: 'edit',
    };

    return { ...state, ...newState, ...data };
  },
  [actions.modalOpen](state, { payload: data }) {
    const newState = {
      modalShow: true,
      headerTitle: 'Error',
    };

    return { ...state, ...newState, ...data };
  },
  [actions.modalDelete](state) {
    const newState = {
      modalShow: true,
      headerTitle: 'Attention !!',
      body: `Are you sure you want to delete ${state.channelName} channel?`,
      type: 'delete',
    };

    return { ...state, ...newState };
  },
}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  modal,
  form: formReducer,
});
