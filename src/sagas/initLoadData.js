import { call, put, all } from 'redux-saga/effects';
import safeTakeLatest from './errorHandlers';
import * as act from '../actions';
import api from '../services';

function* initLoadData() {
  const { token, login } = JSON.parse(sessionStorage.getItem('user'));
  const res = yield call(api.init.loadData, login, token);
  yield put({ type: act.SET_INITIAL_DATA, payload: res });
}

export default function () {
  return all([
    safeTakeLatest(act.INIT_LOAD_DATA, act.INIT_LOAD_DATA_FAIL, initLoadData),
  ]);
}
