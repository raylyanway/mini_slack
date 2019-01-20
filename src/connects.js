import { connect } from 'react-redux';
import * as actionCreators from './actions';
import { messagesSelector } from './selectors';

export const UseChannels = connect(
  ({ channels }) => ({ channels }),
  {},
);

export const UseCurrentChannelId = connect(
  ({ currentChannelId }) => ({ currentChannelId }),
  {
    chooseChannel: actionCreators.chooseChannel,
    addMessage: actionCreators.addMessage,
    modalOpen: actionCreators.modalOpen,
  },
);

export const UseMessages = connect(
  state => ({ messages: messagesSelector(state) }),
  {},
);

export const UseModal = connect(
  ({ modal }) => ({ modal }),
  {
    modalClose: actionCreators.modalClose,
  },
);

export const UseOnlyActions = connect(
  () => ({}),
  {
    addChannel: actionCreators.addChannel,
    modalOpen: actionCreators.modalOpen,
  },
);
