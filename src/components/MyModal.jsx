import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { UseModal } from '../connects';

@UseModal
@reduxForm({
  form: 'editChannel',
})
class MyModal extends React.Component {
  renderFooter = () => {
    const {
      modal: {
        footerDeleteButton,
        footerTrueDeleteButton,
        footerEditButton,
      },
      submitting,
    } = this.props;
    return (
      <Modal.Footer>
        { footerTrueDeleteButton
          ? <Button className="mr-auto" onClick={this.channelTrueDelete}>Delete channel forever</Button>
          : null }
        { footerDeleteButton
          ? <Button className="mr-auto" onClick={this.channelDelete}>Delete</Button>
          : null }
        { footerEditButton
          ? <Button type="submit" disabled={submitting}>Edit</Button>
          : null }
        <Button onClick={this.modalClose}>Close</Button>
      </Modal.Footer>
    );
  }

  renderBody = () => {
    const { modal: { body, footerEditButton, channelName }, submitting } = this.props;

    if (!footerEditButton) {
      return (
        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>
      );
    }
    return (
      <Modal.Body>
        <Field
          name="text"
          disabled={submitting}
          required
          component="input"
          type="text"
          className="form-control"
          autoComplete="off"
          value={channelName}
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
      modalOpen({
        modalShow: true,
        headerTitle: 'Error',
        body: e.message,
        footerDeleteButton: false,
        footerTrueDeleteButton: false,
        footerEditButton: false,
        channelId: null,
      });
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  channelEdit = async ({ text }) => {
    const {
      modal: {
        channelId,
      },
      editChannel,
      modalOpen,
      reset,
    } = this.props;
    const channel = { channelId, attributes: { name: text } };
    try {
      await editChannel(channel);
      reset();
      this.modalClose();
    } catch (e) {
      modalOpen({
        modalShow: true,
        headerTitle: 'Error',
        body: e.message,
        footerDeleteButton: false,
        footerTrueDeleteButton: false,
        footerEditButton: false,
        channelId: null,
        channelName: null,
      });
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  channelDelete = () => {
    const { modalOpen, modal: { channelId, channelName } } = this.props;

    modalOpen({
      modalShow: true,
      headerTitle: 'Attention !!',
      body: `Are you sure you want to delete ${channelName} channel?`,
      footerDeleteButton: false,
      footerTrueDeleteButton: true,
      channelId,
    });
  }

  modalClose = () => {
    const { modalClose } = this.props;
    modalClose(false);
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
