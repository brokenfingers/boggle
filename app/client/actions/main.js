export const TOGGLE_WILD_CARD_MODAL = 'TOGGLE_WILD_CARD_MODAL';

export function toggleWildCardModal(row, col) {
  return {
    type: TOGGLE_WILD_CARD_MODAL,
    payload: {
      row: row,
      col: col
    }
  };
}
