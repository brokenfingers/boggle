export const TOGGLE_WILD_CARD_MODAL = 'TOGGLE_WILD_CARD_MODAL';
export const CLEAR_STATE = 'CLEAR_STATE';

export function toggleWildCardModal(row, col) {
  return {
    type: TOGGLE_WILD_CARD_MODAL,
    payload: {
      row: row,
      col: col
    }
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE
  };
}
