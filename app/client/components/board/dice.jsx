import React, { Component, PropTypes } from 'react';

class Dice extends Component {
  constructor(props) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
  }

  isSelected() {
    for (let i = 0; i < this.props.selectedDices.length; i++) {
      let selectedDice = this.props.selectedDices[i];
      if (selectedDice.row == this.props.row && selectedDice.col == this.props.col)
        return true;
    }
    return false;
  }

  isAdjacentToSelectedDice() {
    if (this.props.anyDiceSelected) {
      let selectedDice = this.props.selectedDices[this.props.selectedDices.length - 1]
      let selectedRow = selectedDice.row;
      let selectedCol = selectedDice.col;

      let currentRow = this.props.row;
      let currentCol = this.props.col;

      if (selectedRow - 1 == currentRow && (selectedCol - 1 == currentCol || selectedCol + 1 == currentCol || selectedCol == currentCol))
        return true;
      else if (selectedRow == currentRow && (selectedCol - 1 == currentCol || selectedCol + 1 == currentCol))
        return true;
      else if (selectedRow + 1 == currentRow && (selectedCol - 1 == currentCol || selectedCol + 1 == currentCol || selectedCol == currentCol))
        return true;
      else
        return false;
    } else {
      return false;
    }
  }

  getClassName() {
    let className = 'dice';

    if (this.isSelected()) {
      className += ' selected';
    } else if (this.isAdjacentToSelectedDice()) {
      className += ' adjacent';
    }

    return className;
  }

  // This needs to be updated
  handleSelection() {
    if (this.props.anyDiceSelected) {
      if (this.isSelected()) {
        this.props.clearSelectedDices();
      } else if (this.isAdjacentToSelectedDice()) {
        this.props.selectDice(this.props.row, this.props.col, this.props.dice.value);
      }
    } else {
      this.props.selectDice(this.props.row, this.props.col, this.props.dice.value);
    }
  }

  render() {
    return (
      <div className={this.getClassName()} onClick={this.handleSelection}>
        {this.props.dice.value}
      </div>
    )
  }
}

Dice.propTypes = {
  dice: PropTypes.object.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired
}

export default Dice;
