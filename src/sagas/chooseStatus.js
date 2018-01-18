import { put, call, select, all } from 'redux-saga/effects';
import safeTakeLatest from './errorHandlers';
import api from '../services';
import * as act from '../actions';
import { getCurrentProject, isRemove } from '../selectors';
import notification from '../utils/notification';
import { DEFAULT_COUNT_HOURS } from '../constants';

function* chooseStatus({ payload: { id, data, fillDayId } }) {
  const project = yield select(getCurrentProject);
  const isRemoveDay = yield select(isRemove);
  const { token, login } = JSON.parse(sessionStorage.getItem('user'));
  switch (true) {
    case project && !isRemoveDay: {
      const newData = {
        id,
        number: data.number,
        dayOfWeek: data.dayOfWeek,
        month: data.month,
        status: project.name,
        color: project.color,
        hours: DEFAULT_COUNT_HOURS,
        year: data.year,
        login,
      };
      const res = yield call(api.status.addDay, newData, token);
      if (res.name) {
        yield put({ type: act.SET_STATUS, payload: { res } });
      }
      break;
    }
    case isRemoveDay: {
      const res = yield call(api.status.removeDay, login, id, fillDayId, token);
      yield put({ type: act.REMOVE_STATUS, payload: { res } });
      break;
    }
    default:
      if (!fillDayId) {
        yield notification('Sorry', 'But you need to select any project');
      }
  }
}

function* saveHours({ payload: { value, id, fillDayId } }) {
  const { token, login } = JSON.parse(sessionStorage.getItem('user'));
  const res = yield call(api.status.saveHours, {
    value, id, fillDayId, login,
  }, token);
  yield put({ type: act.UPDATE_HOURS, payload: { res } });
}

export default function () {
  return all([
    safeTakeLatest(act.CHOOSE_STATUS, act.CHOOSE_STATUS_FAIL, chooseStatus),
    safeTakeLatest(act.SAVE_HOURS, act.SAVE_HOURS_FAIL, saveHours),
  ]);
}
