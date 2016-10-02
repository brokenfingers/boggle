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
          col={index}
          row={this.props.rowNumber}
          dice={dice}
          key={index}
          selectDice={this.props.selectDice}
          selectedDices={this.props.selectedDices}
          anyDiceSelected={this.props.anyDiceSelected}
          clearSelectedDices={this.props.clearSelectedDices}
          toggleWildCardModal={this.props.toggleWildCardModal}
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
