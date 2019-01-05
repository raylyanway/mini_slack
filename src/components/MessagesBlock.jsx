import React from 'react';
import NewMessageForm from './NewMessageForm';

export default class MessagesBlock extends React.Component {
  renderMessages() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    return (
      <ul className="list-group">
        {messages.map(({ id, text }) => (
          <li key={id} className="list-group-item d-flex justify-content-end">
            <div className="mr-auto">{text}</div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <div className="messagesField">
          {this.renderMessages()}
        </div>
        <NewMessageForm />
      </div>
    );
  }
}
