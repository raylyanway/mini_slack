import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewChannelForm from './NewChannelForm';
import { channelsSelector, currentChannelIdSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: currentChannelIdSelector(state),
});

@connect(mapStateToProps)
class ChannelsBlock extends React.Component {
  chooseChannel = id => (e) => {
    e.preventDefault();
    const { chooseChannel } = this.props;
    chooseChannel(id);
  }

  editChannel = (id, name) => () => {
    const { modalEdit } = this.props;
    modalEdit({
      channelId: id,
      channelName: name,
    });
  }

  renderChannels() {
    const { channels, currentChannelId } = this.props;

    if (channels.length === 0) {
      return null;
    }

    return (
      <div className="list-group">
        {channels.map(({ id, name, removable }) => {
          const aClasses = cn({
            'd-flex': true,
            'flex-row': true,
            'list-group-item': true,
            'list-group-item-action': true,
            'text-white': id === currentChannelId,
            'text-white-50': id !== currentChannelId,
            'bg-dark': true,
          });
          return (
            <div key={id}>
              <a
                href={name}
                className={aClasses}
                onClick={this.chooseChannel(id)}
              >
                <div className="mr-auto">
                  {name}
                </div>
                { removable
                  ? <FontAwesomeIcon icon="cog" spin onClick={this.editChannel(id, name)} />
                  : null
                }
              </a>
            </div>
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
