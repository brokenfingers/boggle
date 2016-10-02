import fetch from 'isomorphic-fetch';

export const DISPLAY_RESULT = 'DISPLAY_RESULT';

export function submitWord(word, boardId) {
  return dispatch => {
    return dispatch(verifyWord(word, boardId));
  };
}

export function verifyWord(word, boardId) {
  return dispatch => {
    return fetch(`/api/boards/${boardId}/verify_word/${word}`).then(response => { return response.json() }).then(jsonResponse => { return dispatch(displayResult(jsonResponse)) });
  };
}

export function displayResult(payload) {
  return {
    type: DISPLAY_RESULT,
    payload: payload
  };
}
