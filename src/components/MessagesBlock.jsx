import React from 'react';
import StayScrolled from 'react-stay-scrolled';
import cn from 'classnames';
import NewMessageForm from './NewMessageForm';
import UseMessages from '../connects/messages';

export default @UseMessages class MessagesBlock extends React.Component {
  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (prevProps.messages.length < messages.length) {
      this.stayScrolled();
    }
  }

  storeScrolledControllers = ({ stayScrolled, scrollBottom }) => {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  }

  renderMessages() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    const ulClasses = cn({
      'list-group': true,
      'd-flex': true,
      'flex-column': true,
      'position-relative': true,
    });

    const liStyle = {
      wordBreak: 'break-all',
    };

    const ulStyle = {
      maxHeight: '80vh',
      minHeight: '80vh',
    };

    return (
      <ul className={ulClasses} style={ulStyle}>
        {messages.map(({ id, text, userName }, index) => {
          const liClasses = cn({
            'list-group-item': true,
            'mt-auto': index === 0,
          });
          return (
            <li key={id} className={liClasses} style={liStyle}>
              <div className="mr-auto">
                <b>
                  {userName}
                </b>
              </div>
              <div className="mr-auto">
                {text}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const divStyle = {
      maxHeight: '80vh',
      minHeight: '80vh',
    };

    return (
      <div>
        <StayScrolled
          component="div"
          className="overflow-auto"
          style={divStyle}
          provideControllers={this.storeScrolledControllers}
        >
          {this.renderMessages()}
        </StayScrolled>
        <NewMessageForm />
      </div>
    );
  }
}
