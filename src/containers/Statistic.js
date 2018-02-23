import { connect } from 'react-redux';
import Statistic from '../components/Statistic/Statistic.jsx';
import * as act from '../actions';

const mapStateToProps = ({ statistic }) => ({
  isVisibleStatistic: statistic.isVisibleStatistic,
  statistic: statistic.all,
});

const mapDispatchToProps = dispatch => ({
  onShowStatistic: pos =>
    dispatch({ type: act.SHOW_STATISTIC, pos }),
  onHideStatistic: () =>
    dispatch({ type: act.HIDE_STATISTIC }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
