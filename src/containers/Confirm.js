import { connect } from 'react-redux';
import Confirm from '../components/Confirm/Confirm.jsx';
import { KEYCODE } from '../constants';
import * as act from '../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onRemove: () =>
    dispatch({ type: act.REMOVE }),
  onCancel: e => (
    (!e.keyCode || e.keyCode === KEYCODE.esc)
      ? dispatch({ type: act.HIDE_REMOVE_CONFIRM })
      : null
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
