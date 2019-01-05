import React from 'react';
import { Field, reduxForm } from 'redux-form';

class NewMessageForm extends React.Component {
  addMessage = (values) => {
    const { addMessage, reset } = this.props;
    addMessage(values);
    reset();
  }

  render() {
    const { messageCreatingState, handleSubmit } = this.props;
    const disabled = messageCreatingState === 'requested';

    return (
      <form className="form-inline" onSubmit={handleSubmit(this.addMessage)}>
        <div className="form-group mx-3">
          <Field name="text" required component="input" type="text" />
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="btn btn-primary btn-sm"
        >
          Add
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
