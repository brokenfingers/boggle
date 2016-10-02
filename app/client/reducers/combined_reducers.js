import board from './board';
import game from './game';

import { combineReducers } from 'redux';

export default combineReducers({
  board,
  game
});
