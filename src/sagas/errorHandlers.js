import { takeLatest, put } from 'redux-saga/effects';
import notification from '../utils/notification';
import * as act from '../actions';

const errorMessages = {
  unauthorized: 'your token has been expired, sign in again please',
  [act.CHECK_CREDENTIALS_FAIL]: 'credentials didn\'t pass check',
  [act.REGISTRATION_FAIL]: 'registration fail',
  [act.CHOOSE_STATUS_FAIL]: 'you don\'t choose status',
  [act.SAVE_HOURS_FAIL]: 'you don\'t save hours',
  [act.INIT_LOAD_DATA_FAIL]: 'data couldn\'t loaded',
  [act.ADD_NEW_FAIL]: 'you don\'t add new item',
  [act.SAVE_FAIL]: 'you don\'t save last changes',
  [act.REMOVE_FAIL]: 'you don\'t remove item',
};

function safeTakeLatest(actions, errorAction, saga) {
  return takeLatest(actions, function* handler(...args) {
    try {
      yield* saga(...args);
    } catch (error) {
      if (error.status === 401) {
        notification(error.statusText, errorMessages.unauthorized);
        yield put({
          type: act.SET_INITIAL_DATA,
          payload: { employees: [], projects: [] },
        });
        yield sessionStorage.removeItem('user');
        yield put({ type: act.REDIRECT_TO_AUTH });
        return;
      }

      notification(error.statusText || 'error', errorMessages[errorAction]);
    }
  });
}

export default safeTakeLatest;
