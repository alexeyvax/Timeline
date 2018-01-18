import * as act from '../actions';

const initialState = {
  isVisibleStatistic: false,
  all: [],
};

export default function statistic(state = initialState, action) {
  switch (action.type) {
    case act.SHOW_STATISTIC_SUCCESS:
      return {
        ...state,
        isVisibleStatistic: true,
        all: action.payload.allStatistic,
      };

    case act.HIDE_STATISTIC_SUCCESS:
      return {
        ...state,
        isVisibleStatistic: initialState.isVisibleStatistic,
        all: initialState.allStatistic,
      };

    default:
      return state;
  }
}
