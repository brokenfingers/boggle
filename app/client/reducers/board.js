import {
  LOAD_BOARD
} from '../actions/board';

export default function board(state={
  board: {}
}, action) {
  switch (action.type) {
    case LOAD_BOARD:
      return Object.assign({}, state, {
        board: action.payload
      });
    default:
      return state;
  }
}
