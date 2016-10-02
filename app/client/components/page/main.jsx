import React, { Component } from 'react';
import Application from '../layout/application';
import Board from '../board/board';

import { connect } from 'react-redux';
import { getBoard } from '../../actions/board';
import { verifyWord } from '../../actions/game';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getBoard());
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleInputSubmit(event) {
    // Check that the word that is trying to be submitted is not already in the list of correct words
    if (event.key === 'Enter') {
      this.props.dispatch(verifyWord(this.state.inputValue, this.props.board.id));
    }
  }

  render() {
    return (
      <Application>
        <div>
          <Board board={this.props.board} />

          <input type='text' onChange={this.handleInputChange} onKeyUp={this.handleInputSubmit}/>
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
    points: state.game.points
  };
}

export default connect(mapStateToProps)(Main);
