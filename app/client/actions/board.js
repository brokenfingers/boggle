import fetch from 'isomorphic-fetch';

export const LOAD_BOARD = 'LOAD_BOARD';
export const SELECT_DICE = 'SELECT_DICE';
export const CLEAR_SELECTED_DICES = 'CLEAR_SELECTED_DICES';

export function getBoard() {
  return (dispatch) => {
    return dispatch(fetchBoard());
  };
}

export function fetchBoard() {
  return dispatch => {
    return fetch('/api/boards').then(response => { return response.json() }).then(jsonResponse => { return dispatch(loadBoard(jsonResponse)) });
  };
}

export function loadBoard(payload) {
  return {
    type: LOAD_BOARD,
    payload: payload
  };
}

export function selectDice(row, col, value) {
  return {
    type: SELECT_DICE,
    payload: {
      coordinates: {
        row: row,
        col: col
      },
      value: value
    }
  };
}

export function clearSelectedDices() {
  return {
    type: CLEAR_SELECTED_DICES
  };
}
