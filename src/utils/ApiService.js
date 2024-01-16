import { BASE_URL } from './constants';

// Класс для работы с API
class ApiService {
  constructor(url) {
    this._baseUrl = url;
    this._apiUrl = `${url}/auth`; // Формирование URL для авторизации
  }

  // Обработка ответа от сервера
  async _handleResponse(res) {
    try {
      if (res.ok) {
        return await res.json();
      } else {
        throw res;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Получение списка ингредиентов
  async getIngredients() {
    try {
      const res = await fetch(`${this._baseUrl}/ingredients`);
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Отправка ингредиентов на сервер
  async sendIngredients(token, ids) {
    try {
      const res = await fetch(`${this._baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          ingredients: ids,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Получение информации о заказе по номеру
  async getOrderInfo(number) {
    try {
      const res = await fetch(`${this._baseUrl}/orders/${number}`);
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Отправка запроса на сброс пароля по email
  async sendEmail(email) {
    try {
      const res = await fetch(`${this._baseUrl}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Сброс пароля с использованием токена
  async resetPassword(token, password) {
    try {
      const res = await fetch(`${this._baseUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Вход пользователя
  async login({ email, password }) {
    try {
      const res = await fetch(`${this._apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Регистрация нового пользователя
  async register({ email, name, password }) {
    try {
      const res = await fetch(`${this._apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Получение данных пользователя
  async getUserData(token) {
    try {
      const res = await fetch(`${this._apiUrl}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Отправка данных пользователя на сервер
  async sendUserData(token, { name, email, password }) {
    try {
      const res = await fetch(`${this._apiUrl}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Обновление токена доступа
  async refreshToken(token) {
    try {
      const res = await fetch(`${this._apiUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Выход пользователя
  async logout(token) {
    try {
      const res = await fetch(`${this._apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

// Создание экземпляра ApiService с базовым URL
const apiService = new ApiService(BASE_URL);
export default apiService;
