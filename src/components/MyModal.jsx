import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { modalSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = state => ({
  modal: modalSelector(state),
});

@connect(mapStateToProps)
@reduxForm({
  form: 'editChannelForm',
})
class MyModal extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      initialize,
      modal: {
        channelName,
        modalShow,
      },
    } = this.props;
    if (modalShow !== prevProps.modal.modalShow) {
      initialize({ channelName });
    }
  }

  renderFooter = () => {
    const {
      modal: { type },
      submitting,
    } = this.props;
    return (
      <Modal.Footer>
        { type === 'delete'
          ? <Button className="mr-auto btn btn-danger" onClick={this.channelTrueDelete}>Delete channel forever</Button>
          : null }
        { type === 'edit'
          ? <Button className="mr-auto btn btn-warning" onClick={this.channelDelete}>Delete</Button>
          : null }
        { type === 'edit'
          ? <Button className="btn btn-success" type="submit" disabled={submitting}>Edit</Button>
          : null }
        <Button onClick={this.modalClose}>Close</Button>
      </Modal.Footer>
    );
  }

  renderBody = () => {
    const { modal: { body, type }, submitting } = this.props;

    if (!type || type === 'delete') {
      return (
        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>
      );
    }
    return (
      <Modal.Body>
        <Field
          name="channelName"
          disabled={submitting}
          required
          component="input"
          type="text"
          className="form-control"
          autoComplete="off"
        />
      </Modal.Body>
    );
  }

  renderHeader = () => {
    const { modal: { headerTitle } } = this.props;
    return (
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {headerTitle}
        </Modal.Title>
      </Modal.Header>
    );
  }

  channelTrueDelete = async () => {
    const { deleteChannel, modalOpen, modal: { channelId } } = this.props;

    try {
      await deleteChannel(channelId);
      this.modalClose();
    } catch (e) {
      modalOpen({ body: e.message });
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  channelEdit = async ({ channelName }) => {
    const {
      modal: {
        channelId,
      },
      editChannel,
      modalOpen,
      reset,
    } = this.props;
    const channel = { channelId, attributes: { name: channelName } };
    try {
      await editChannel(channel);
      this.modalClose();
      reset();
    } catch (e) {
      modalOpen({ body: e.message });
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  channelDelete = () => {
    const { modalDelete } = this.props;
    modalDelete();
  }

  modalClose = () => {
    const { modalClose } = this.props;
    modalClose();
  }

  render() {
    const { modal: { modalShow }, handleSubmit } = this.props;

    return (
      <Modal
        show={modalShow}
        onHide={this.modalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.renderHeader()}
        <form onSubmit={handleSubmit(this.channelEdit)}>
          {this.renderBody()}
          {this.renderFooter()}
        </form>
      </Modal>
    );
  }
}

export default MyModal;
