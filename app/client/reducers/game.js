import {
  DISPLAY_RESULT
} from '../actions/game';

export default function game(state={
  points: 0,
  correctWords: [],
  incorrectWords: []
}, action) {
  switch (action.type) {
    case DISPLAY_RESULT:
      if (action.payload.valid) {
       return Object.assign({}, state, {
         correctWords: [...state.correctWords, [action.payload.word]],
         points: state.points + action.payload.points
       });
      } else {
        return Object.assign({}, state, {
          incorrectWords: [...state.incorrectWords, [action.payload.word]],
          points: state.points + action.payload.points
        });
      }
    default:
      return state;
  }
}
