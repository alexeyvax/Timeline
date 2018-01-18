import { all } from 'redux-saga/effects';
import getChoosenMonth from './getChoosenMonth';
import chooseStatus from './chooseStatus';
import initLoadData from './initLoadData';
import list from './list';
import statistic from './statistic';
import authUser from './authUser';

export default function* rootSaga() {
  yield all([
    getChoosenMonth(),
    chooseStatus(),
    initLoadData(),
    list(),
    statistic(),
    authUser(),
  ]);
}
