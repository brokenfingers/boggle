import React, { Component } from 'react';
import Application from '../layout/application';
import Board from '../board/board';

import { connect } from 'react-redux';
import { getBoard } from '../../actions/board';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getBoard());
  }

  render() {
    return (
      <Application>
        <div>
          <Board board={this.props.board}/>
        </div>
      </Application>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board.board
  };
}

export default connect(mapStateToProps)(Main);
