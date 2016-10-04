import React, { Component, PropTypes } from 'react';

class ScoreBoard extends Component {
  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        <p className='score'>Total Points: {this.props.points}</p>
        <div className='words-container'>
          <p className='score'>Submitted Words: {this.props.correctWords.join(', ')}</p>
        </div>
      </div>
    );
  }
}

ScoreBoard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  points: PropTypes.number.isRequired,
  correctWords: PropTypes.array.isRequired
}

export default ScoreBoard;
