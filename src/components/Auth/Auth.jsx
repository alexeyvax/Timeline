import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Hint from '../Hint/Hint.jsx';
import './theme.css';

const Auth = ({
  login,
  password,
  registrationLogin,
  registrationPassword,
  warning,
  authWarning,
  redirectToReferrer,
  onHandleChangeLogin,
  onHandleChangePasswd,
  onLogin,
  onHandleChangeRegLogin,
  onHandleChangeRegPasswd,
  onRegistration,
}) => {
  const handleChangeLogin = e => onHandleChangeLogin(e.target.value);
  const handleChangePasswd = e => onHandleChangePasswd(e.target.value);
  const handleChangeRegLogin = e => onHandleChangeRegLogin(e.target.value);
  const handleChangeRegPasswd = e => onHandleChangeRegPasswd(e.target.value);

  if (redirectToReferrer) {
    return (
      <Redirect to={{ pathname: '/protected' }} />
    );
  }
  return (
    <div>
      <div className={'login-container'}>
        <h2>Authenticate</h2>
        {authWarning && <Hint content={'Wrong login or password'} />}
        <label htmlFor={'login'}>Enter your login please</label>
        <input
          type='text'
          id={'login'}
          value={login}
          onChange={handleChangeLogin} />
        <label htmlFor={'password'}>Enter your password please</label>
        <input
          type='password'
          id={'password'}
          value={password}
          onChange={handleChangePasswd} />
        <button type='button' onClick={onLogin}>Log in</button>
      </div>
      <div className={'registration-container'}>
        <h2>Registration</h2>
        {warning && <Hint content={'Please fill this fields'} />}
        <label htmlFor={'reg-login'}>Enter your login please</label>
        <input
          type='text'
          id={'reg-login'}
          value={registrationLogin}
          onChange={handleChangeRegLogin} />
        <label htmlFor={'reg-password'}>Enter your password please</label>
        <input
          type='password'
          id={'reg-password'}
          value={registrationPassword}
          onChange={handleChangeRegPasswd} />
        <button type='button' onClick={onRegistration}>send</button>
      </div>
    </div>
  );
};

Auth.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  registrationLogin: PropTypes.string,
  registrationPassword: PropTypes.string,
  warning: PropTypes.bool,
  authWarning: PropTypes.bool,
  redirectToReferrer: PropTypes.bool.isRequired,
  onHandleChangeLogin: PropTypes.func.isRequired,
  onHandleChangePasswd: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onHandleChangeRegLogin: PropTypes.func.isRequired,
  onHandleChangeRegPasswd: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired,
};

export default Auth;
