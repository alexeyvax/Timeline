import { connect } from 'react-redux';
import App from '../components/App.jsx';
import * as act from '../actions';

const mapStateToProps = ({ data, confirm }) => ({
  loaded: data.loaded,
  projects: data.projects,
  employeesLength: data.employees.length,
  isConfirmOpened: confirm.isConfirmOpened,
});

const mapDispatchToProps = dispatch => ({
  onInitLoadData: () =>
    dispatch({ type: act.INIT_LOAD_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
