import React, { Component } from 'react';
import Application from '../layout/application';
import Board from '../board/board';
import Modal from '../shared/modal/modal';

import { connect } from 'react-redux';
import { getBoard, selectDice, clearSelectedDices } from '../../actions/board';
import { verifyWord, updateInput } from '../../actions/game';

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getBoard();
  }

  handleInputChange(event) {
    this.props.updateInput(event.target.value);
  }

  handleInputSubmit(event) {
    // Need to set error message when already used word was used
    if (event.key === 'Enter' && this.props.correctWords.indexOf(this.props.inputValue) == -1) {
      this.props.verifyWord(this.props.inputValue, this.props.board.id);
    }
  }

  handleButtonSubmit(event) {
    if (this.props.correctWords.indexOf(this.props.inputValue) == -1) {
      this.props.verifyWord(this.props.inputValue, this.props.board.id);
    }
  }

  // Input needs to be controlled by the store to handle dice selection
  render() {
    return (
      <Application>
        <div>
          <div>
            {this.props.points}
          </div>
          <Board
            board={this.props.board}
            selectDice={this.props.selectDice}
            clearSelectedDices={this.props.clearSelectedDices}
            selectedDices={this.props.selectedDices}
          />

          <div className='container-fluid input-container'>
            <div className='row'>
              <input type='text' onChange={this.handleInputChange} onKeyUp={this.handleInputSubmit} value={this.props.inputValue}/>
            </div>
            <div className='row'>
              <button className='btn btn-default' onClick={this.handleButtonSubmit}>Submit</button>
            </div>
          </div>
        </div>
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
    selectedDices: state.board.selectedDices
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBoard: () => dispatch(getBoard()),
    updateInput: (value) => dispatch(updateInput(value)),
    selectDice: (row, col, value) => dispatch(selectDice(row, col, value)),
    verifyWord: (word, id) => dispatch(verifyWord(word, id)),
    clearSelectedDices: () => dispatch(clearSelectedDices())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
