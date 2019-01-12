import { createSelector } from 'reselect';

export const getMessages = state => state.messages;
export const getcurrentChannelId = state => state.currentChannelId;
export const messagesSelector = createSelector(
  getMessages,
  getcurrentChannelId,
  (messages, currentChannelId) => Object.values(messages)
    .filter(m => m.channelId === currentChannelId),
);
