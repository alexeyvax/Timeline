import { connect } from 'react-redux';
import MainTable from '../components/MainTable/MainTable.jsx';
import * as act from '../actions';

const mapStateToProps = ({ data }) => ({
  dates: data.dates,
  employees: data.employees,
  isRemove: data.isRemove,
  currentProjectData: data.currentProjectData,
});

const mapDispatchToProps = dispatch => ({
  onChooseStatus: (data, id, fillDayId) =>
    dispatch({ type: act.CHOOSE_STATUS, payload: { data, id, fillDayId } }),
  onSaveHours: (value, id, fillDayId) =>
    dispatch({ type: act.SAVE_HOURS, payload: { value, id, fillDayId } }),
  onResetCurrentProject: () =>
    dispatch({ type: act.RESET_CURRENT_PROJECT }),
  onClearDay: () =>
    dispatch({ type: act.CLEAR_DAY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
