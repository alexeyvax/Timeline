import { put, select, takeLatest, all } from 'redux-saga/effects';
import getInfoStatistic from '../selectors/statistic';
import * as act from '../actions';

function* showStatistic(payload) {
  const allStatistic = yield select(getInfoStatistic);
  document.body.style.transform = `translateY(-${payload.pos}px)`;
  yield put({ type: act.SHOW_STATISTIC_SUCCESS, payload: { allStatistic } });
}

function* hideStatistic() {
  document.body.style.transform = 'translateY(0)';
  yield put({ type: act.HIDE_STATISTIC_SUCCESS });
}

export default function () {
  return all([
    takeLatest(act.SHOW_STATISTIC, showStatistic),
    takeLatest(act.HIDE_STATISTIC, hideStatistic),
  ]);
}
