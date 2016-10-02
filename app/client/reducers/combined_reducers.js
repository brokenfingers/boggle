import board from './board';
import game from './game';
import main from './main';

import { combineReducers } from 'redux';

export default combineReducers({
  board,
  game,
  main
});
