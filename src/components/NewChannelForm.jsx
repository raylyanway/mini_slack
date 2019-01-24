import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

@connect(() => ({}))
@reduxForm({
  form: 'newChannel',
})
class NewChannelForm extends React.Component {
  createChannel = async ({ text }) => {
    const { addChannel, reset, modalOpen } = this.props;
    const channel = { attributes: { name: text } };
    try {
      await addChannel(channel);
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
      <form className="form-inline" onSubmit={handleSubmit(this.createChannel)}>
        <div className="input-group w-100">
          <Field
            name="text"
            disabled={submitting}
            required
            component="input"
            type="text"
            className="form-control shadow-none border-light"
            autoComplete="off"
          />
          <div className="input-group-append">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-success btn-sm"
            >
              Add channel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewChannelForm;
