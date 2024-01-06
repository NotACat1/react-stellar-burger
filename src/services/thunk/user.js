import { REFRESH_TOKEN_COOKIE_NAME } from '../../utils/constants';
import apiService from '../../utils/ApiService';
import cookieManager from '../../utils/cookieManager';

import {
  forgotGetUserData,
  forgotPasswordFailed,
  forgotPasswordSuccess,
  forgotSendUserData,
  getUserDataFailed,
  getUserDataSuccess,
  getUserOrders,
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  refreshTokenFailed,
  refreshTokenSuccess,
  registrationFailed,
  registrationSuccess,
  resetPaswordFailed,
  resetPaswordSuccess,
  sendUserDataFailed,
  sendUserDataSuccess,
  setForgotPasswordState,
  startForgotPassword,
  startLogin,
  startLogout,
  startRefreshToken,
  startRegistration,
  startResetPasword,
  wsUserOrdersConnectionClosed,
  wsUserOrdersConnectionStart,
} from '../actions/user';

// Регистрация нового пользователя
export const registration = ({ email, name, password }) =>
  async (dispatch) => {
    // Диспатч стартового действия для регистрации
    dispatch(startRegistration());
    try {
      // Вызов API для регистрации
      const registrationData = await apiService.register({ email, name, password });
      // Успешная регистрация - диспатч соответствующего действия
      dispatch(registrationSuccess(registrationData.accessToken));
      // Установка refreshToken в cookie
      cookieManager.setCookie(REFRESH_TOKEN_COOKIE_NAME, registrationData.refreshToken);
    } catch (error) {
      // Обработка ошибки при неудачной регистрации
      dispatch(registrationFailed(error));
    }
  };

// Вход пользователя
export const login = ({ email, password }) =>
  async (dispatch) => {
    dispatch(startLogin());
    try {
      const loginData = await apiService.login({ email, password });
      dispatch(loginSuccess(loginData));
      cookieManager.setCookie(REFRESH_TOKEN_COOKIE_NAME, loginData.refreshToken);
    } catch (error) {
      dispatch(loginFailed(error));
    }
  };

// Получение данных пользователя
export const getUserData = (accessToken) => async (dispatch) => {
  dispatch(forgotGetUserData());
  try {
    const userData = await apiService.getUserData(accessToken);
    dispatch(getUserDataSuccess(userData.user));
  } catch (error) {
    apiService.handleApiError(error, dispatch, cookieManager.getCookie(REFRESH_TOKEN_COOKIE_NAME));
    dispatch(getUserDataFailed(error));
  }
};

// Обновление данных пользователя
export const sendUserData = (accessToken, { name, email, password }) =>
  async (dispatch) => {
    dispatch(forgotSendUserData());
    try {
      const sendData = await apiService.sendUserData(accessToken, { name, email, password });
      dispatch(sendUserDataSuccess(sendData.user));
    } catch (error) {
      apiService.handleApiError(error, dispatch, cookieManager.getCookie(REFRESH_TOKEN_COOKIE_NAME));
      dispatch(sendUserDataFailed(error));
    }
  };

// Обновление refreshToken
export const refreshToken = (refreshToken) => async (dispatch) => {
  dispatch(startRefreshToken());
  try {
    const refreshTokenData = await apiService.refreshToken(refreshToken);
    dispatch(refreshTokenSuccess(refreshTokenData.accessToken));
    cookieManager.refreshCookie(REFRESH_TOKEN_COOKIE_NAME, refreshTokenData.refreshToken);
  } catch (error) {
    dispatch(refreshTokenFailed(error));
  }
};

// Запрос на восстановление пароля
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(startForgotPassword());
  try {
    await apiService.sendEmail(email);
    dispatch(forgotPasswordSuccess());
    dispatch(setForgotPasswordState(true));
  } catch (error) {
    dispatch(forgotPasswordFailed(error));
  }
};

// Сброс пароля
export const resetPassword = ({ code, password }) =>
  async (dispatch) => {
    dispatch(startResetPasword());
    try {
      await apiService.resetPassword(code, password);
      dispatch(resetPaswordSuccess());
      dispatch(setForgotPasswordState(false));
    } catch (error) {
      dispatch(resetPaswordFailed(error));
    }
  };

// Выход пользователя
export const logout = () => async (dispatch) => {
  dispatch(startLogout());
  try {
    await apiService.logout(cookieManager.getCookie(REFRESH_TOKEN_COOKIE_NAME));
    dispatch(logoutSuccess());
    // Удаление refreshToken из cookie при выходе
    cookieManager.deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  } catch (error) {
    dispatch(logoutFailed(error));
  }
};
