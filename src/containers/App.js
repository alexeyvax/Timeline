import { connect } from 'react-redux';
import App from '../components/App.jsx';
import * as act from '../actions';

const mapStateToProps = state => ({
  loaded: state.data.loaded,
  projects: state.data.projects,
  employeesLength: state.data.employees.length,
  isConfirmOpened: state.confirm.isConfirmOpened,
});

const mapDispatchToProps = dispatch => ({
  onInitLoadData: () =>
    dispatch({ type: act.INIT_LOAD_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
