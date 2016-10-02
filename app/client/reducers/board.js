import {
  LOAD_BOARD, SELECT_DICE, CLEAR_SELECTED_DICES
} from '../actions/board';

import {
  DISPLAY_RESULT
} from '../actions/game';

import {
  CLEAR_STATE
} from '../actions/main';

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
    case DISPLAY_RESULT:
      return Object.assign({}, state, {
        selectedDices: []
      });
    case CLEAR_STATE:
      return Object.assign({}, state, {
        board: {},
        selectedDices: []
      });
    default:
      return state;
  }
}
