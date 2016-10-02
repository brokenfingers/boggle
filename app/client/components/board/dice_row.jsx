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
          dice={dice}
          key={index}
        />
      )
    });

    return dices;
  }

  render() {
    return (
      <div>
        {this.renderDices()}
      </div>
    )
  }
}

DiceRow.propTypes = {
  numberOfCols: PropTypes.number.isRequired,
  dices: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DiceRow
