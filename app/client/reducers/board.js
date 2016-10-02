import {
  LOAD_BOARD, SELECT_DICE
} from '../actions/board';

export default function board(state={
  board: {},
  selectedDice: {
    row: null,
    col: null
  }
}, action) {
  switch (action.type) {
    case LOAD_BOARD:
      return Object.assign({}, state, {
        board: action.payload
      });
    case SELECT_DICE:
      return Object.assign({}, state, {
        selectedDice: action.payload
      });
    default:
      return state;
  }
}
