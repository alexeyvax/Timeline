import { connect } from 'react-redux';
import Auth from '../components/Auth/Auth.jsx';
import * as act from '../actions';

const mapStateToProps = state => ({
  login: state.authUser.login,
  password: state.authUser.password,
  registrationLogin: state.authUser.registrationLogin,
  registrationPassword: state.authUser.registrationPassword,
  warning: state.authUser.warning,
  authWarning: state.authUser.authWarning,
  redirectToReferrer: state.authUser.redirectToReferrer,
});

const mapDispatchToProps = dispatch => ({
  onHandleChangeLogin: login =>
    dispatch({ type: act.HANDLE_CHANGE_LOGIN, payload: { login } }),
  onHandleChangePasswd: passwd =>
    dispatch({ type: act.HANDLE_CHANGE_PASSWD, payload: { passwd } }),
  onLogin: () =>
    dispatch({ type: act.CHECK_CREDENTIALS }),
  onHandleChangeRegLogin: login =>
    dispatch({ type: act.HANDLE_CHANGE_REGISTRATION_LOGIN, payload: { login } }),
  onHandleChangeRegPasswd: passwd =>
    dispatch({ type: act.HANDLE_CHANGE_REGISTRATION_PASSWD, payload: { passwd } }),
  onRegistration: () =>
    dispatch({ type: act.REGISTRATION }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
