import { v4 as generateUniqueId } from 'uuid'; // Импорт функции генерации уникальных идентификаторов из библиотеки uuid
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
  DELETE_INGREDIENT,
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  SORT_INGREDIENTS,
  SET_ORDER_STATE,
} from '../types/burger'; // Импорт типов действий из файла с определением типов для бургера

// Создание действий (action creators)

// Добавление булки
export const addBun = (ingredient) => ({
  type: ADD_BUN, // Указание типа действия
  payload: { ...ingredient, uuid: generateUniqueId() }, // Передача данных (полезной нагрузки) в действие, включая уникальный идентификатор
});

// Добавление ингредиента
export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT, // Указание типа действия
  payload: { ...ingredient, uuid: generateUniqueId() }, // Передача данных (полезной нагрузки) в действие, включая уникальный идентификатор
});

// Удаление ингредиента по уникальному идентификатору
export const deleteIngredient = (uuid) => ({ type: DELETE_INGREDIENT, payload: uuid });

// Удаление всех ингредиентов
export const deleteAllIngredients = () => ({ type: DELETE_ALL_INGREDIENTS });

// Сортировка ингредиентов
export const sortIngredients = (newArray) => ({ type: SORT_INGREDIENTS, payload: newArray });

// Отправка заказа
export const sendOrder = () => ({ type: SEND_ORDER });

// Обработка ошибки при отправке заказа
export const sendOrderFailed = (error = 'Unknown error') => ({ type: SEND_ORDER_FAILED, payload: error });

// Успешное завершение отправки заказа с указанием номера заказа
export const sendOrderSuccess = (number) => ({ type: SEND_ORDER_SUCCESS, payload: number });

export const setOrderState = (state) => ({ type: SET_ORDER_STATE, payload: state });
