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

// Действия связанные с восстановлением пароля
export const startForgotPassword = () => ({ type: START_FORGOT_PASSWORD });
export const forgotPasswordSuccess = () => ({ type: FORGOT_PASSWORD_SUCCESS });
export const forgotPasswordFailed = (error = 'Unknown error') => ({ type: FORGOT_PASSWORD_FAILED, payload: error });

// Действия связанные с процессом входа
export const startLogin = () => ({ type: START_LOGIN });
export const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
export const loginFailed = (error = 'Unknown error') => ({ type: LOGIN_FAILED, payload: error });

// Действия связанные с процессом выхода
export const startLogout = () => ({ type: START_LOGOUT });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFailed = (error = 'Unknown error') => ({ type: LOGOUT_FAILED, payload: error });

// Действия связанные с обновлением токена
export const startRefreshToken = () => ({ type: START_REFRESH_TOKEN });
export const refreshTokenSuccess = (token) => ({ type: REFRESH_TOKEN_SUCCESS, payload: token });
export const refreshTokenFailed = (error = 'Unknown error') => ({ type: REFRESH_TOKEN_FAILED, payload: error });

// Действия связанные с процессом регистрации
export const startRegistration = () => ({ type: START_REGISTRATION });
export const registrationSuccess = (userData) => ({ type: REGISTRATION_SUCCESS, payload: userData });
export const registrationFailed = (error = 'Unknown error') => ({ type: REGISTRATION_FAILED, payload: error });

// Действия связанные с процессом сброса пароля
export const startResetPasword = () => ({ type: START_RESET_PASSWORD });
export const resetPaswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });
export const resetPaswordFailed = (error = 'Unknown error') => ({ type: RESET_PASSWORD_FAILED, payload: error });

// Действия связанные с установкой состояния восстановления пароля
export const setForgotPasswordState = (state) => ({ type: SET_FORGOT_PASSWORD_STATE, payload: state });

// Действия связанные с получением данных пользователя
export const forgotGetUserData = () => ({ type: GET_USER_DATA });
export const getUserDataSuccess = (userData) => ({ type: GET_USER_DATA_SUCCESS, payload: userData });
export const getUserDataFailed = (error = 'Unknown error') => ({ type: GET_USER_DATA_FAILED, payload: error });

// Действия связанные с отправкой данных пользователя
export const forgotSendUserData = () => ({ type: SEND_USER_DATA });
export const sendUserDataSuccess = (userData) => ({ type: SEND_USER_DATA_SUCCESS, payload: userData });
export const sendUserDataFailed = (error = 'Unknown error') => ({ type: SEND_USER_DATA_FAILED, payload: error });

// Действия связанные с WebSocket соединением для получения заказов пользователя
export const wsUserOrdersConnectionStart = () => ({ type: WS_START });
export const wsUserOrdersConnectionClosed = () => ({ type: WS_CLOSED });
export const getUserOrders = () => ({ type: WS_GET_ORDERS });
