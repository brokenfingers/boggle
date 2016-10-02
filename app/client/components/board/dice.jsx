import React, { Component, PropTypes } from 'react';

class Dice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.dice.value}
      </div>
    )
  }
}

Dice.propTypes = {
  dice: PropTypes.object.isRequired
}

export default Dice;
