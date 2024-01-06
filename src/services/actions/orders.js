// Импорт типов действий для работы с WebSocket из файла '../types/orders'
import { WS_CLOSED, WS_ERROR, WS_GET_ORDERS, WS_START, WS_SUCCESS } from '../types/orders';

// Действие для запуска соединения с WebSocket
export const wsOrdersConnectionStart = () => ({ type: WS_START });

// Действие для закрытия соединения с WebSocket
export const wsOrdersConnectionClosed = () => ({ type: WS_CLOSED });

// Действие для запроса данных о заказах через WebSocket
export const getOrders = (data) => ({ type: WS_GET_ORDERS, payload: data });
