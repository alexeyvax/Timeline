import * as act from '../actions';

const initialState = {
  isConfirmOpened: false,
  removeElement: null,
};

export default function confirm(state = initialState, action) {
  switch (action.type) {
    case act.SHOW_REMOVE_CONFIRM:
      return {
        ...state,
        isConfirmOpened: true,
        removeElement: action.payload,
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
