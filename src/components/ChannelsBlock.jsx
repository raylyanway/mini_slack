import React from 'react';
import cn from 'classnames';
import NewChannelForm from './NewChannelForm';
import { UseCurrentChannelId, UseChannels } from '../connects';

@UseChannels
@UseCurrentChannelId
class ChannelsBlock extends React.Component {
  chooseChannel = id => (e) => {
    e.preventDefault();
    const { chooseChannel } = this.props;
    chooseChannel(id);
  }

  renderChannels() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <div className="list-group">
        {channels.map(({ id, name }) => {
          const aClasses = cn({
            'list-group-item': true,
            'list-group-item-action': true,
            'text-white': id === currentChannelId,
            'text-white-50': id !== currentChannelId,
            'bg-dark': true,
          });
          return (
            <a
              key={id}
              href={name}
              className={aClasses}
              onClick={this.chooseChannel(id)}
            >
              <div className="mr-auto">{name}</div>
            </a>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <NewChannelForm />
        {this.renderChannels()}
      </div>
    );
  }
}

export default ChannelsBlock;
