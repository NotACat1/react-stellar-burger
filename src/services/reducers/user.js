import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  SEND_USER_DATA,
  SEND_USER_DATA_FAILED,
  SEND_USER_DATA_SUCCESS,
  SET_FORGOT_PASSWORD_STATE,
  START_FORGOT_PASSWORD,
  START_LOGIN,
  START_LOGOUT,
  START_REFRESH_TOKEN,
  START_REGISTRATION,
  START_RESET_PASSWORD,
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_START,
  WS_SUCCESS,
} from '../types/user';

const initialState = {
  isRequestingRegistration: false,
  hasRequestRegistrationFailed: false,
  isRequestingLogin: false,
  hasRequestLoginFailed: false,
  isRequestingForgotPassword: false,
  hasRequestForgotPasswordFailed: false,
  isRequestingResetPassword: false,
  hasRequestResetPasswordFailed: false,
  isRequestingGetUserData: false,
  hasRequestGetUserDataFailed: false,
  isRequestingLogout: false,
  hasRequestLogoutFailed: false,
  isRequestingRefreshToken: false,
  hasRequestRefreshTokenFailed: false,
  isRequestingSendUserData: false,
  hasRequestSendUserDataFailed: false,
  isPasswordForgot: false,
  accessToken: null,
  isLoading: false,
  isConnection: false,
  hasConnectionFailed: false,
  orders: [],
  information: {},
  errors: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_REGISTRATION: {
      return {
        ...state,
        isRequestingRegistration: true,
        hasRequestRegistrationFailed: false,
      };
    }
    case REGISTRATION_SUCCESS: {
      const { user, accessToken } = payload;
      return {
        ...state,
        isRequestingRegistration: false,
        accessToken: accessToken,
        information: user,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        isRequestingRegistration: false,
        hasRequestRegistrationFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case START_LOGIN: {
      return {
        ...state,
        isRequestingLogin: true,
        hasRequestLoginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isRequestingLogin: false,
        accessToken: payload.accessToken,
        information: payload.user,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isRequestingLogin: false,
        hasRequestLoginFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case START_FORGOT_PASSWORD: {
      return {
        ...state,
        isRequestingForgotPassword: true,
        hasRequestForgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isRequestingForgotPassword: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isRequestingForgotPassword: false,
        hasRequestForgotPasswordFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case START_RESET_PASSWORD: {
      return {
        ...state,
        isRequestingResetPassword: true,
        hasRequestResetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isRequestingResetPassword: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        isRequestingResetPassword: false,
        hasRequestResetPasswordFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case GET_USER_DATA: {
      return {
        ...state,
        isRequestingGetUserData: true,
        hasRequestGetUserDataFailed: false,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isRequestingGetUserData: false,
        information: payload,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        isRequestingGetUserData: false,
        hasRequestGetUserDataFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case START_LOGOUT: {
      return {
        ...state,
        isRequestingLogout: true,
        hasRequestLogoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isRequestingLogout: false,
        information: {},
        accessToken: null,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isRequestingLogout: false,
        hasRequestLogoutFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case START_REFRESH_TOKEN: {
      return {
        ...state,
        isRequestingRefreshToken: true,
        hasRequestRefreshTokenFailed: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isRequestingRefreshToken: false,
        accessToken: payload,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        isRequestingRefreshToken: false,
        hasRequestRefreshTokenFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case SEND_USER_DATA: {
      return {
        ...state,
        isRequestingSendUserData: true,
        hasRequestSendUserDataFailed: false,
      };
    }
    case SEND_USER_DATA_SUCCESS: {
      return {
        ...state,
        isRequestingSendUserData: false,
        information: payload,
      };
    }
    case SEND_USER_DATA_FAILED: {
      return {
        ...state,
        isRequestingSendUserData: false,
        hasRequestSendUserDataFailed: true,
        errors: [...state.errors, payload],
      };
    }
    case SET_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        isPasswordForgot: payload,
      };
    }
    case WS_START:
      return {
        ...state,
        isLoading: true,
        isConnection: false,
        hasConnectionFailed: false,
        orders: [],
      };
    case WS_SUCCESS:
      return {
        ...state,
        isConnection: true,
      };
    case WS_ERROR:
      return {
        ...state,
        hasConnectionFailed: true,
        errors: [...state.errors, payload],
      };
    case WS_GET_ORDERS: {
      const { orders } = payload;
      return {
        ...state,
        isLoading: false,
        hasConnectionFailed: false,
        orders: [...orders],
      };
    }
    case WS_CLOSED:
      return {
        ...state,
        isConnection: false,
      };
    default: {
      return state;
    }
  }
};
