// Action Types
import {
  FETCH_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../actions/burger-ingredients';

// Начальное состояние для редьюсера ингредиентов
const initialState = {
  loading: true, // Флаг загрузки данных
  error: null, // Ошибка при загрузке данных (если есть)
  ingredients: [], // Список ингредиентов
};

// Редьюсер для управления состоянием ингредиентов
export const ingredientsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Обработка начала загрузки ингредиентов
    case FETCH_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    // Обработка успешной загрузки ингредиентов
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ingredients: payload,
      };
    }
    // Обработка ошибки при загрузке ингредиентов
    case GET_INGREDIENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default: {
      return state;
    }
  }
};
