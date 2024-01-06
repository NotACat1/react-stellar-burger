import { FETCH_ORDER, FETCH_ORDER_FAILED, FETCH_ORDER_SUCCESS } from '../types/order';

// Действие для запроса заказа
export const fetchOrder = () => ({ type: FETCH_ORDER });

// Действие при успешном получении заказа
export const fetchOrderSuccess = (orderData) => ({ type: FETCH_ORDER_SUCCESS, payload: orderData });

// Действие при неудачном получении заказа
export const fetchOrderFailed = (error = 'Unknown error') => ({ type: FETCH_ORDER_FAILED, payload: error });
