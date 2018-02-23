import { connect } from 'react-redux';
import Auth from '../components/Auth/Auth.jsx';
import * as act from '../actions';

const mapStateToProps = ({ authUser }) => ({
  login: authUser.login,
  password: authUser.password,
  registrationLogin: authUser.registrationLogin,
  registrationPassword: authUser.registrationPassword,
  warning: authUser.warning,
  authWarning: authUser.authWarning,
  redirectToReferrer: authUser.redirectToReferrer,
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
