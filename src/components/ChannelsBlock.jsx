import React from 'react';

export default class ChannelsBlock extends React.Component {
  renderChannels() {
    const { channels } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <ul className="list-group">
        {channels.map(({ id, name }) => (
          <li key={id} className="list-group-item d-flex justify-content-end">
            <div className="mr-auto">{name}</div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return this.renderChannels();
  }
}
