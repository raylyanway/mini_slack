import { createSelector } from 'reselect';

export const getMessages = state => state.entities.messages;
export const getCurrentChannelId = state => state.result.currentChannelId;
export const messagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, currentChannelId) => Object.values(messages)
    .filter(m => m.channelId === currentChannelId),
);
export const getChannels = state => state.entities.channels;
export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);
export const currentChannelIdSelector = createSelector(
  getCurrentChannelId,
  CurrentChannelId => CurrentChannelId,
);
export const getModal = state => state.entities.modal;
export const modalSelector = createSelector(
  getModal,
  modal => modal,
);
