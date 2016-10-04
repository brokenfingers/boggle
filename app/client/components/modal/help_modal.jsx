import React, { Component, PropTypes } from 'react';

import Modal from '../shared/modal/modal';
import ModalHeader from '../shared/modal/modal_header';
import ModalBody from '../shared/modal/modal_body';

class HelpModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.props.toggleModalOnKeyPress);
  }

  render() {
    return (
      <Modal show={this.props.show} id='help-modal'>
        <ModalHeader>
          <div className='row'>
            <div className='col-xs-6'>
              <h4>How to Play</h4>
            </div>
            <div className='col-xs-6'>
              <a href='' className='pull-right' onClick={this.props.toggleModal}>X</a>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          Put the rules and the twist
        </ModalBody>
      </Modal>
    );
  }
}

HelpModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleModalOnKeyPress: PropTypes.func.isRequired
}

export default HelpModal;
