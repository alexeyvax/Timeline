import * as act from '../actions';

const initialState = {
  login: '',
  password: '',
  warning: false,
  authWarning: false,
  redirectToReferrer: false,
  registrationLogin: '',
  registrationPassword: '',
};
export default function auth(state = initialState, action) {
  switch (action.type) {
    case act.HANDLE_CHANGE_LOGIN:
      return {
        ...state,
        login: action.payload.login,
        authWarning: false,
      };

    case act.HANDLE_CHANGE_PASSWD:
      return {
        ...state,
        password: action.payload.passwd,
        authWarning: false,
      };

    case act.HANDLE_CHANGE_REGISTRATION_LOGIN:
      return {
        ...state,
        registrationLogin: action.payload.login,
        warning: false,
      };

    case act.HANDLE_CHANGE_REGISTRATION_PASSWD:
      return {
        ...state,
        registrationPassword: action.payload.passwd,
        warning: false,
      };

    case act.REDIRECT_TO_REFERRER:
      return {
        ...state,
        redirectToReferrer: true,
      };

    case act.REDIRECT_TO_AUTH_SUCCESS:
      return {
        ...state,
        redirectToReferrer: initialState.redirectToReferrer,
      };

    case act.SHOW_WARNING:
      return {
        ...state,
        warning: true,
      };

    case act.SHOW_AUTH_WARNING:
      return {
        ...state,
        authWarning: true,
      };

    case act.RESET_REGISTRATION_FIELDS:
      return {
        ...state,
        registrationLogin: initialState.registrationLogin,
        registrationPassword: initialState.registrationPassword,
      };

    default:
      return state;
  }
}
