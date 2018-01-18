import { combineReducers } from 'redux';
import data from './data';
import confirm from './confirm';
import statistic from './statistic';
import authUser from './authUser';

const rootReducer = combineReducers({
  data,
  confirm,
  statistic,
  authUser,
});

export default rootReducer;
