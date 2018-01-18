export const getLogin = state => state.authUser.login;
export const getLoginFromSession = state =>
  state.authUser.login || JSON.parse(sessionStorage.getItem('user')).login;
export const getPasswd = state => state.authUser.password;
export const getRegistrationLogin = state => state.authUser.registrationLogin;
export const getRegistrationPasswd = state => state.authUser.registrationPassword;
