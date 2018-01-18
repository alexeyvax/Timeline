import { connect } from 'react-redux';
import Controls from '../components/Dates/Controls/Controls.jsx';
import * as act from '../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toPrevMonth: () =>
    dispatch({ type: act.GO_TO_PREVIOS_MONTH }),
  toNextMonth: () =>
    dispatch({ type: act.GO_TO_NEXT_MONTH }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
