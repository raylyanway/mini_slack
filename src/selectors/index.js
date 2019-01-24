import { createSelector } from 'reselect';

export const getMessages = state => state.messages;
export const getCurrentChannelId = state => state.currentChannelId;
export const messagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => Object.values(messages)
    .filter(m => m.channelId === currentChannelId),
);
export const getChannels = state => state.channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);
export const currentChannelIdSelector = createSelector(
  getCurrentChannelId,
  CurrentChannelId => CurrentChannelId,
);
export const getModal = state => state.modal;
export const modalSelector = createSelector(
  getModal,
  modal => modal,
);
