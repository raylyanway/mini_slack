import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = message => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    await axios.post(
      routes.addMessage(message.currentChannelId),
      { data: message },
    );
  } catch (e) {
    dispatch(addMessageFailure());
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error('Sending message failed!');
  }
};

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = channel => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    await axios.post(
      routes.addChannel(),
      { data: channel },
    );
  } catch (e) {
    dispatch(addChannelFailure());
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error('Adding channel failed!');
  }
};

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const deleteChannel = channelId => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    await axios.delete(
      routes.deleteChannel(channelId),
    );
  } catch (e) {
    dispatch(deleteChannelFailure());
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error('Deleting channel failed!');
  }
};

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

export const editChannel = channel => async (dispatch) => {
  dispatch(editChannelRequest());
  try {
    await axios.patch(
      routes.editChannel(channel.channelId),
      { data: channel },
    );
  } catch (e) {
    dispatch(editChannelFailure());
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error('Editing channel failed!');
  }
};

export const chooseChannel = createAction('CHANNEL_CHOOSE');

export const modalEdit = createAction('MODAL_EDIT');
export const modalDelete = createAction('MODAL_DELETE');
export const modalOpen = createAction('MODAL_OPEN');
export const modalClose = createAction('MODAL_CLOSE');
