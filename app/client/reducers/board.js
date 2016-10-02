import {
  LOAD_BOARD, SELECT_DICE, CLEAR_SELECTED_DICES
} from '../actions/board';

export default function board(state={
  board: {},
  selectedDices: []
}, action) {
  switch (action.type) {
    case LOAD_BOARD:
      return Object.assign({}, state, {
        board: action.payload
      });
    case SELECT_DICE:
      return Object.assign({}, state, {
        selectedDices: [...state.selectedDices, action.payload.coordinates]
      });
    case CLEAR_SELECTED_DICES:
      return Object.assign({}, state, {
        selectedDices: []
      });
    default:
      return state;
  }
}
