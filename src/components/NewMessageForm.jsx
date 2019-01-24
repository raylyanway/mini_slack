import React from 'react';
import { Field, reduxForm } from 'redux-form';
import UserNameContext from '../context';
import { currentChannelIdSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = state => ({
  currentChannelId: currentChannelIdSelector(state),
});

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})
class NewMessageForm extends React.Component {
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
    const {
      addMessage,
      reset,
      currentChannelId,
      modalOpen,
    } = this.props;
    const message = { currentChannelId, attributes: { text, userName } };
    try {
      await addMessage(message);
      reset();
    } catch (e) {
      modalOpen({
        headerTitle: 'Error',
        body: e.message,
      });
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;

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
            className="form-control shadow-none border-light"
            autoComplete="off"
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

export default NewMessageForm;
