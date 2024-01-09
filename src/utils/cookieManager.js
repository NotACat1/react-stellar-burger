import { DEFAULT_EXPIRATION_DAYS } from './constants';

const cookieManager = {
  // Функция для установки куки
  setCookie: (name, value, days = DEFAULT_EXPIRATION_DAYS) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  },

  // Функция для получения значения куки по имени
  getCookie: (name) => {
    const cookieName = `${name}=`;
    const cookieArray = document.cookie.split(';');
    const cookie = cookieArray.find((cookie) => cookie.trim().indexOf(cookieName) === 0);
    return cookie ? cookie.substring(cookieName.length, cookie.length) : null;
  },

  // Функция для удаления куки по имени
  deleteCookie: (name) => {
    const expirationDate = new Date(0); // Установка времени истечения в 0
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=; ${expires}; path=/`;
  },
};

export default cookieManager;
