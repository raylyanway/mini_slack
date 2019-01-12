import React from 'react';
import { Field, reduxForm } from 'redux-form';
import UseCurrentChannelId from '../connects/currentChannelId';
import UserNameContext from '../context';

@UseCurrentChannelId class NewMessageForm extends React.Component {
  static contextType = UserNameContext;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidUpdate() {
    this.textInput.current.getRenderedComponent().focus();
  }

  createMessage = async ({ text }) => {
    const userName = this.context;
    const { addMessage, reset, currentChannelId } = this.props;
    const message = { currentChannelId, attributes: { text, userName } };
    try {
      await addMessage(message);
    } catch (e) {
      console.log(e);
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    const inputStyle = {
      boxShadow: 'none',
      border: '1px solid #ccc',
    };

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.createMessage)}>
        <div className="input-group w-100">
          <Field
            name="text"
            disabled={submitting}
            required
            component="input"
            type="text"
            ref={this.textInput}
            forwardRef
            autoFocus={!submitting}
            className="form-control"
            autoComplete="off"
            style={inputStyle}
          />
          <div className="input-group-append">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-sm"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
