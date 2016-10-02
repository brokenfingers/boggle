import React, { Component } from 'react';

import Modal from '../shared/modal/modal';
import ModalHeader from '../shared/modal/modal_header';
import ModalBody from '../shared/modal/modal_body';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

class WildCardModal extends Component {
  constructor(props) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(event) {
    let selectedDice = this.props.wildCardDice;

    this.props.selectDice(selectedDice.row, selectedDice.col, event.target.textContent);
  }

  renderChoices() {
    let choices = [];
    ALPHABET.forEach((letter, index) => {
      choices.push(
        <div className='wild-card-choice' onClick={this.handleSelection} key={index}>
          {letter}
        </div>
      );
    });

    return choices;
  }

  render() {
    return (
      <Modal show={this.props.show} id='wild-card-modal'>
        <ModalBody>
          <div className='wild-card-choices'>
            {this.renderChoices()}
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default WildCardModal;
