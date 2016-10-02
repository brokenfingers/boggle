import {
  TOGGLE_WILD_CARD_MODAL
} from '../actions/main';

import {
  SELECT_DICE
} from '../actions/board';


export default function main(state={
  wildCardDice: {},
  displayWildCardModal: false
}, action) {
  switch (action.type) {
    case TOGGLE_WILD_CARD_MODAL:
      return Object.assign({}, state, {
        wildCardDice: action.payload,
        displayWildCardModal: true
      });
    case SELECT_DICE:
      return Object.assign({}, state, {
        wildCardDice: {},
        displayWildCardModal: false
      });
    default:
      return state;
  }
}
