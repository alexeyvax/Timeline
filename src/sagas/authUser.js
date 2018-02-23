import { put, call, select, takeLatest, all } from 'redux-saga/effects';
import safeTakeLatest from './errorHandlers';
import {
  getLogin, getPasswd, getRegistrationLogin, getRegistrationPasswd,
} from '../selectors/auth';
import * as act from '../actions';
import api from '../services';
import notification from '../utils/notification';

function* checkCreadentials() {
  const login = yield select(getLogin);
  const passwd = yield select(getPasswd);
  const res = yield call(api.authUser.auth, { login, passwd });

  if (res) {
    yield put({ type: act.REDIRECT_TO_REFERRER });
    sessionStorage.setItem('user', JSON.stringify({ login, token: res }));
  } else {
    yield put({ type: act.SHOW_AUTH_WARNING });
  }
}

function* registration() {
  const login = yield select(getRegistrationLogin);
  const passwd = yield select(getRegistrationPasswd);
  const res = yield call(api.authUser.registration, { login, passwd });


  if (res && login) {
    yield notification('Congratulation', `${res} - ${login}`);
    yield put({ type: act.RESET_REGISTRATION_FIELDS });
  } else {
    yield put({ type: act.SHOW_WARNING });
  }
}

function* signOut() {
  yield sessionStorage.removeItem('user');
  yield put({ type: act.REDIRECT_TO_AUTH_SUCCESS });
}

export default function () {
  return all([
    safeTakeLatest(act.CHECK_CREDENTIALS, act.CHECK_CREDENTIALS_FAIL, checkCreadentials),
    safeTakeLatest(act.REGISTRATION, act.REGISTRATION_FAIL, registration),
    takeLatest(act.REDIRECT_TO_AUTH, signOut),
  ]);
}
