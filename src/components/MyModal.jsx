import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UseModal } from '../connects';

@UseModal
class MyModal extends React.Component {
  renderBody = () => {
    const { modal: { body } } = this.props;
    return (
      <Modal.Body>
        <p>{body}</p>
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

  modalClose = () => {
    const { modalClose } = this.props;
    modalClose(false);
  }

  render() {
    const { modal: { modalShow } } = this.props;

    return (
      <Modal
        show={modalShow}
        onHide={this.modalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.renderHeader()}
        {this.renderBody()}
        <Modal.Footer>
          <Button onClick={this.modalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyModal;
