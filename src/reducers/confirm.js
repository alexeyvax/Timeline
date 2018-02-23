import * as act from '../actions';

const initialState = {
  isConfirmOpened: false,
  removeElement: null,
};

export default function confirm(state = initialState, { type, payload }) {
  switch (type) {
    case act.SHOW_REMOVE_CONFIRM:
      return {
        ...state,
        isConfirmOpened: true,
        removeElement: payload,
      };

    case act.HIDE_REMOVE_CONFIRM:
      return {
        ...state,
        isConfirmOpened: initialState.isConfirmOpened,
        removeElement: initialState.removeElement,
      };

    default:
      return state;
  }
}
