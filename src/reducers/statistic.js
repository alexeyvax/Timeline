import * as act from '../actions';

const initialState = {
  isVisibleStatistic: false,
  all: [],
};

export default function statistic(state = initialState, { type, payload }) {
  switch (type) {
    case act.SHOW_STATISTIC_SUCCESS:
      return {
        ...state,
        isVisibleStatistic: true,
        all: payload.allStatistic,
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
