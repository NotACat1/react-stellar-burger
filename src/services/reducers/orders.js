import { WS_CLOSED, WS_ERROR, WS_GET_ORDERS, WS_START, WS_SUCCESS } from '../types/orders';

// Начальное состояние редуктора для заказов
const initialState = {
  orders: [], // Массив заказов
  isLoading: false, // Флаг загрузки данных
  isConnection: false, // Флаг успешного подключения к WebSocket
  hasConnectionFailed: false, // Флаг неудачного подключения к WebSocket
  total: 0, // Общее количество заказов
  totalToday: 0, // Общее количество заказов за текущий день
  errors: [], // Список ошибок, если они возникли
};

// Редуктор для управления состоянием заказов
export const ordersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WS_START:
      // Начало подключения к WebSocket
      return {
        ...initialState,
        isLoading: true,
      };
    case WS_SUCCESS:
      // Успешное подключение к WebSocket
      return {
        ...state,
        isConnection: true,
      };
    case WS_ERROR:
      // Ошибка при подключении к WebSocket
      return {
        ...state,
        hasConnectionFailed: true,
        errors: [...state.errors, payload],
      };
    case WS_GET_ORDERS: {
      // Получение данных о заказах через WebSocket
      const { orders, total, totalToday } = payload;
      return {
        ...state,
        isLoading: false,
        hasConnectionFailed: false,
        orders: [...orders],
        total,
        totalToday,
      };
    }
    case WS_CLOSED:
      // Закрытие WebSocket
      return {
        ...state,
        isConnection: false,
      };
    default:
      // Возврат текущего состояния в случае неизвестного действия
      return state;
  }
};
