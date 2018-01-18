import { put, call, select, takeLatest, all } from 'redux-saga/effects';
import { getCurrentEmployees } from '../selectors';
import { getPrevMonthData, getNextMonthData } from '../selectors/gethoosenMonths';
import * as act from '../actions';

function* setDataEmployees() {
  const newEmployees = yield select(getCurrentEmployees);
  yield put({ type: act.SET_DATA_WHEN_CHANGE_MONTHS, payload: { newEmployees } });
}

function* getPrevMonth() {
  const newDate = yield select(getPrevMonthData);
  yield put({ type: act.SET_DATE, payload: { newDate } });
  yield call(setDataEmployees);
}

function* getNextMonth() {
  const newDate = yield select(getNextMonthData);
  yield put({ type: act.SET_DATE, payload: { newDate } });
  yield call(setDataEmployees);
}

export default function () {
  return all([
    takeLatest(act.GO_TO_PREVIOS_MONTH, getPrevMonth),
    takeLatest(act.GO_TO_NEXT_MONTH, getNextMonth),
  ]);
}
