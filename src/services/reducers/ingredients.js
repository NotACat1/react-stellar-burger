// Импорт типов действий для ингредиентов
import { FETCH_INGREDIENTS, FETCH_INGREDIENTS_FAILED, FETCH_INGREDIENTS_SUCCESS } from '../types/ingredients';

// Начальное состояние редюсера для ингредиентов
const initialState = {
  ingredients: [], // Массив ингредиентов
  isRequesting: false, // Флаг, указывающий на активность запроса
  hasRequestFailed: false, // Флаг, указывающий на неудачу запроса
  errors: [], // Массив ошибок при запросе
};

// Редюсер для управления состоянием ингредиентов
export const ingredientsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_INGREDIENTS:
      // Запуск запроса на получение ингредиентов
      return { ...state, isRequesting: true, hasRequestFailed: false };
    case FETCH_INGREDIENTS_SUCCESS:
      // Успешное получение ингредиентов
      return { ...state, isRequesting: false, ingredients: payload };
    case FETCH_INGREDIENTS_FAILED:
      // Ошибка при получении ингредиентов
      return {
        ...state,
        isRequesting: false,
        hasRequestFailed: true,
        errors: [...state.errors, payload],
      };
    default:
      // Возвращение текущего состояния в случае неизвестного действия
      return state;
  }
};
