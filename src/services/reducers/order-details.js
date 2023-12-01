// Action Types
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CLOSE_ORDER_MODAL,
} from '../actions/order-details';

// Начальное состояние для редюсера заказов
const initialState = {
  loading: false, // Флаг загрузки данных
  order: null, // Информация о заказе
  error: null, // Ошибка, если есть
  open: false, // Флаг открытого состояния заказа
};

// Редюсер для заказов
export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Установка состояния загрузки и сброс предыдущего заказа и ошибки
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        order: null,
        error: null,
        open: false,
      };
    // Установка состояния загрузки в false и обновление заказа данными из payload
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
        open: true,
      };
    // Установка состояния загрузки в false и обновление ошибки данными из payload
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    // Закрытие состояния заказа
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
