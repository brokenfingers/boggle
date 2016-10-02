import React, { Component, PropTypes } from 'react';
import Dice from './dice';

class DiceRow extends Component {
  constructor(props) {
    super(props);
  }

  renderDices() {
    let dices = [];

    this.props.dices.forEach((dice, index) => {
      dices.push(
        <Dice
          colNumber={index}
          rowNumber={this.props.rowNumber}
          dice={dice}
          key={index}
          selectDice={this.props.selectDice}
          selectedDice={this.props.selectedDice}
          anyDiceSelected={this.props.anyDiceSelected}
        />
      )
    });

    return dices;
  }

  render() {
    return (
      <div className='board-row'>
        {this.renderDices()}
      </div>
    )
  }
}

DiceRow.propTypes = {
  rowNumber: PropTypes.number.isRequired,
  numberOfCols: PropTypes.number.isRequired,
  dices: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DiceRow
