import { call, put, race, select, take, takeLatest, all } from 'redux-saga/effects';
import safeTakeLatest from './errorHandlers';
import { getCurrentProject, getRemoveElement } from '../selectors';
import { EMPLOYEE, PROJECT } from '../constants';
import * as act from '../actions';
import api from '../services';

function* addNew({ payload: { name, type, color } }) {
  const { token, login } = JSON.parse(sessionStorage.getItem('user'));
  if (type === EMPLOYEE) {
    const res = yield call(api.list.add, { type, name, login }, token);
    yield put({ type: act.SET_DATA, payload: { newEmployees: res } });
  } else if (type === PROJECT) {
    const res = yield call(api.list.add, {
      type, name, color, login,
    }, token);
    yield put({ type: act.SET_DATA, payload: { newProjects: res } });
  }
}

function* saveProject(res, name) {
  const currentProject = yield select(getCurrentProject);
  yield put({ type: act.SAVE_PROJECT_SUCCESS, payload: { res: res.project } });
  if (res.employee) {
    yield put({ type: act.SET_DATA, payload: { newEmployees: res.employee } });
  }
  if (currentProject) {
    yield put({ type: act.UPDATE_CURRENT_PROJECT, payload: { name } });
  }
}

function* save({ payload: { name, id, type } }) {
  const { token, login } = JSON.parse(sessionStorage.getItem('user'));
  const res = yield call(api.list.save, {
    type, name, id, login,
  }, token);
  if (type === EMPLOYEE) {
    yield put({ type: act.SAVE_EMPLOYEE_SUCCESS, payload: { res } });
  } else if (type === PROJECT) {
    yield call(saveProject, res, name);
  }
}

function* removeRace({ payload }) {
  yield put({ type: act.SHOW_REMOVE_CONFIRM, payload });
  yield race({
    removed: take(act.REMOVE),
    canceled: take(act.HIDE_REMOVE_CONFIRM),
  });
}

function* remove() {
  const { token, login } = JSON.parse(sessionStorage.getItem('user'));
  const { id, type } = yield select(getRemoveElement);
  const res = yield call(api.list.remove, { type, id, login }, token);
  if (type === EMPLOYEE) {
    yield put({ type: act.SET_DATA, payload: { newEmployees: res } });
  } else if (type === PROJECT) {
    yield put({
      type: act.SET_DATA,
      payload: { newProjects: res.projects, newEmployees: res.employees },
    });
    yield put({ type: act.RESET_CURRENT_PROJECT });
  }
  yield put({ type: act.HIDE_REMOVE_CONFIRM });
}

export default function () {
  return all([
    safeTakeLatest(act.ADD_NEW, act.ADD_NEW_FAIL, addNew),
    safeTakeLatest(act.SAVE, act.SAVE_FAIL, save),
    safeTakeLatest(act.REMOVE, act.REMOVE_FAIL, remove),
    takeLatest(act.REMOVE_RACE, removeRace),
  ]);
}
