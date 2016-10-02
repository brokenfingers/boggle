import fetch from 'isomorphic-fetch';

export const LOAD_BOARD = 'LOAD_BOARD';

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
