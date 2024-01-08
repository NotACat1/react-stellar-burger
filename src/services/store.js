// Redux - библиотека для управления состоянием приложения
import { compose, createStore, applyMiddleware } from 'redux';

// rootReducer - корневой редюсер, объединяющий все редюсеры в приложении
import { rootReducer } from './reducers/index';

// Redux Thunk - middleware для обработки асинхронных действий в Redux
import thunk from 'redux-thunk';

// Импорт констант для URL-ов WebSocket соединений
import { ALL_ORDERS_URL, USER_ORDERS_URL } from '../utils/constants';

// Импорт middleware для WebSocket соединения
import { socketMiddleware } from './middleware/socketMiddleware';

// Импорт типов действий для WebSocket соединения с заказами
import * as orderActionTypes from './types/orders';

// Импорт типов действий для WebSocket соединения с пользовательскими заказами
import * as userActionTypes from './types/user';

// Объект с действиями для WebSocket соединения с заказами
const wsActions = {
  wsInit: orderActionTypes.WS_START,
  onOpen: orderActionTypes.WS_SUCCESS,
  onClose: orderActionTypes.WS_CLOSED,
  onError: orderActionTypes.WS_ERROR,
  onMessage: orderActionTypes.WS_GET_ORDERS,
};

// Объект с действиями для WebSocket соединения с пользовательскими заказами
const wsPersonalActions = {
  wsInit: userActionTypes.WS_START,
  onOpen: userActionTypes.WS_SUCCESS,
  onClose: userActionTypes.WS_CLOSED,
  onError: userActionTypes.WS_ERROR,
  onMessage: userActionTypes.WS_GET_ORDERS,
};

// Настройка Redux DevTools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Создание хранилища Redux с применением middleware
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    // Применение middleware для WebSocket соединения с общими заказами
    socketMiddleware(ALL_ORDERS_URL, wsActions),
    // Применение middleware для WebSocket соединения с пользовательскими заказами
    socketMiddleware(USER_ORDERS_URL, wsPersonalActions),
  ),
);

// Экспорт созданного хранилища Redux
export const store = createStore(rootReducer, enhancer);
