import { connect } from 'react-redux';
import Statistic from '../components/Statistic/Statistic.jsx';
import * as act from '../actions';

const mapStateToProps = state => ({
  isVisibleStatistic: state.statistic.isVisibleStatistic,
  statistic: state.statistic.all,
});

const mapDispatchToProps = dispatch => ({
  onShowStatistic: pos =>
    dispatch({ type: act.SHOW_STATISTIC, pos }),
  onHideStatistic: () =>
    dispatch({ type: act.HIDE_STATISTIC }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
