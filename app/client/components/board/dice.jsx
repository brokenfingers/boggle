import React, { Component, PropTypes } from 'react';

class Dice extends Component {
  constructor(props) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
  }

  isSelected() {
    if (this.props.anyDiceSelected)
      return this.props.rowNumber == this.props.selectedDice.row && this.props.colNumber == this.props.selectedDice.col;
    else
      return false;
  }

  isAdjacentToSelectedDice() {
    let selectedRow = this.props.selectedDice.row;
    let selectedCol = this.props.selectedDice.col;

    if (this.props.anyDiceSelected) {
      let currentRow = this.props.rowNumber;
      let currentCol = this.props.colNumber;

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

  handleSelection() {
    if (this.props.anyDiceSelected) {
      if (this.isAdjacentToSelectedDice())
        this.props.selectDice(this.props.rowNumber, this.props.colNumber);
    } else {
      this.props.selectDice(this.props.rowNumber, this.props.colNumber);
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
  rowNumber: PropTypes.number.isRequired,
  colNumber: PropTypes.number.isRequired
}

export default Dice;
