import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthButton from '../components/Auth/AuthButton.jsx';
import { getLoginFromSession } from '../selectors/auth';
import * as act from '../actions';

const mapStateToProps = state => ({
  login: getLoginFromSession(state),
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () =>
    dispatch({ type: act.REDIRECT_TO_AUTH }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthButton));
