import React, { Component } from 'react';
import Application from '../layout/application';
import Board from '../board/board';
import WildCardModal from '../modal/wild_card_modal';
import ScoreBoard from '../main/score_board';
import HelpModal from '../modal/help_modal';

import { connect } from 'react-redux';
import { getBoard, selectDice, clearSelectedDices } from '../../actions/board';
import { verifyWord, updateInput } from '../../actions/game';
import { toggleWildCardModal, clearState } from '../../actions/main';

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.toggleModalOnKeyPress = this.toggleModalOnKeyPress.bind(this);
    this.handleStartNewGame= this.handleStartNewGame.bind(this);

    this.state = {
      displayHelpModal: true
    };
  }

  componentDidMount() {
    this.props.clearState();
    this.props.getBoard();
  }

  handleInputChange(event) {
    this.props.updateInput(event.target.value);
  }

  handleInputSubmit(event) {
    // Need to set error message when already used word was used
    if (event.key === 'Enter' && this.props.correctWords.indexOf(this.props.inputValue) < 0 && this.props.inputValue.length >= 3) {
      this.props.verifyWord(this.props.inputValue, this.props.board.id);
    }
  }

  handleButtonSubmit(event) {
    if (this.props.correctWords.indexOf(this.props.inputValue) < 0 && this.props.inputValue.length >= 3) {
      this.props.verifyWord(this.props.inputValue, this.props.board.id);
    }
  }

  toggleHelpModal(event) {
    event.preventDefault();
    this.setState({displayHelpModal: !this.state.displayHelpModal});
  }

  toggleModalOnKeyPress(event) {
    if (event.keyCode === 27) {
      document.removeEventListener('keyup', this.toggleModalOnKeyPress);
      this.setState({displayHelpModal: false});
    }
  }

  handleStartNewGame(event) {
    event.preventDefault();
    this.props.clearState();
    this.props.getBoard();
  }

  // Input needs to be controlled by the store to handle dice selection
  render() {
    return (
      <Application>
        <div className='container-fluid main-container'>
          <ScoreBoard
            className='scoreboard-container'
            points={this.props.points}
            correctWords={this.props.correctWords}
            incorrectWords={this.props.incorrectWords}
          />

          <a href='' onClick={this.toggleHelpModal}>How to play?</a>

          <Board
            board={this.props.board}
            selectDice={this.props.selectDice}
            clearSelectedDices={this.props.clearSelectedDices}
            selectedDices={this.props.selectedDices}
            toggleWildCardModal={this.props.toggleWildCardModal}
          />

          <div className='input-container'>
            <div className='row'>
              <input type='text' className='form-control' onChange={this.handleInputChange} onKeyUp={this.handleInputSubmit} value={this.props.inputValue}/>
            </div>
            <div className='row'>
              <button className='btn btn-primary form-control home-btn' onClick={this.handleButtonSubmit}>Submit</button>
            </div>
            <div className='row'>
              <button className='btn btn-danger form-control' onClick={this.handleStartNewGame}>START NEW GAME</button>
            </div>
          </div>
        </div>
        <HelpModal show={this.state.displayHelpModal} toggleModal={this.toggleHelpModal} toggleModalOnKeyPress={this.toggleModalOnKeyPress}/>
        <WildCardModal show={this.props.displayWildCardModal} wildCardDice={this.props.wildCardDice} selectDice={this.props.selectDice}/>
      </Application>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board.board,
    inputValue: state.game.inputValue,
    correctWords: state.game.correctWords,
    incorrectWords: state.game.incorrectWords,
    points: state.game.points,
    selectedDices: state.board.selectedDices,
    wildCardDice: state.main.wildCardDice,
    displayWildCardModal: state.main.displayWildCardModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBoard: () => dispatch(getBoard()),
    updateInput: (value) => dispatch(updateInput(value)),
    selectDice: (row, col, value) => dispatch(selectDice(row, col, value)),
    verifyWord: (word, id) => dispatch(verifyWord(word, id)),
    clearSelectedDices: () => dispatch(clearSelectedDices()),
    toggleWildCardModal: (row, col) => dispatch(toggleWildCardModal(row, col)),
    clearState: () => dispatch(clearState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
