import React, { Component, PropTypes } from 'react';

import Modal from '../shared/modal/modal';
import ModalHeader from '../shared/modal/modal_header';
import ModalBody from '../shared/modal/modal_body';

class HelpModal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show)
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
          <p>The objective of the game is to find as many words as you can from the board</p>
          <ul>
            <li>The letters must be adjoining in a 'chain'. (Letter cubes in the chain may be adjacent horizontally, vertically, or diagonally)</li>
            <li>Words must contain at least three letters.</li>
            <li>No letter cube may be used more than once within a single word.</li>
            <li>You can choose any letter for wildcard dices (*). (The value can change for each word)</li>
            <li>You can click on a letter to select it or directly type in the word and press 'Submit' or 'Enter'</li>
          </ul>
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
