import React, { Component, PropTypes } from 'react';

class ScoreBoard extends Component {
  render() {
    return (
      <div className={`container-fluid ${this.props.className}`} id={this.props.id}>
        <p>Total Points: {this.props.points}</p>
      </div>
    );
  }
}

ScoreBoard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  points: PropTypes.number.isRequired
}

export default ScoreBoard;
