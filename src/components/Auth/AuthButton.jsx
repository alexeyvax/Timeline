import React from 'react';
import PropTypes from 'prop-types';

const AuthButton = ({ history, login, onSignOut }) => {
  const signOut = () => {
    history.push('/auth');
    onSignOut();
  };
  return (
    <div className={'auth-container'}>
      <p>{`Welcome ${login}!`}</p>
      <button onClick={signOut}>{'Sign out'}</button>
    </div>
  );
};

AuthButton.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default AuthButton;
