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
  }
};

export const chooseChannel = createAction('CHANNEL_CHOOSE');
