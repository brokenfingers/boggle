import React, { Component } from 'react';
import Application from '../layout/application';
import Board from '../board/board';

import { connect } from 'react-redux';
import { getBoard, selectDice } from '../../actions/board';
import { verifyWord } from '../../actions/game';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getBoard();
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleInputSubmit(event) {
    // Need to set error message when already used word was used
    if (event.key === 'Enter' && this.props.correctWords.indexOf(this.state.inputValue) == -1) {
      this.props.verifyWord(this.state.inputValue, this.props.board.id);
      this.setState({inputValue: ''});
    }
  }

  handleButtonSubmit(event) {
    if (this.props.correctWords.indexOf(this.state.inputValue) == -1) {
      this.props.verifyWord(this.state.inputValue, this.props.board.id);
      this.setState({inputValue: ''});
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
          <Board board={this.props.board} selectDice={this.props.selectDice} selectedDices={this.props.selectedDices}/>

          <div className='container-fluid input-container'>
            <div className='row'>
              <input type='text' onChange={this.handleInputChange} onKeyUp={this.handleInputSubmit} value={this.state.inputValue}/>
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
    correctWords: state.game.correctWords,
    incorrectWords: state.game.incorrectWords,
    points: state.game.points,
    selectedDices: state.board.selectedDices
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBoard: () => dispatch(getBoard()),
    selectDice: (row, col) => dispatch(selectDice(row, col)),
    verifyWord: (word) => dispatch(verifyWord(word))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
