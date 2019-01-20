const host = '/api/v1';

export default {
  addMessage: channelId => [host, `channels/${channelId}/messages`].join('/'),
  addChannel: () => [host, 'channels'].join('/'),
};
