import React, { Component, PropTypes } from 'react';
import DiceRow from './dice_row';

var _ = require('lodash');

class Board extends Component {
  constructor(props) {
    super(props);
  }

  anyDiceSelected() {
    return this.props.selectedDices.length > 0;
  }

  renderRows() {
    let board_node_rows = _.chunk(this.props.board.nodes, this.props.board.num_of_columns);

    let board_rows = [];

    for (let i = 0; i < this.props.board.num_of_rows; i++) {
      board_rows.push(
        <DiceRow
          rowNumber={i}
          dices={board_node_rows[i]}
          numberOfCols={this.props.board.num_of_columns}
          key={i}
          selectDice={this.props.selectDice}
          selectedDices={this.props.selectedDices}
          anyDiceSelected={this.anyDiceSelected()}
          clearSelectedDices={this.props.clearSelectedDices}
          toggleWildCardModal={this.props.toggleWildCardModal}
        />
      )
    }

    return board_rows;
  }

  render() {
    return (
      <div className='board-container'>
        <div id='boggle-board'>
          {this.renderRows()}
        </div>
      </div>
    )
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired
}

export default Board;
