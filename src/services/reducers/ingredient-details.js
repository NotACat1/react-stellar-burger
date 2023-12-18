// Action Types
import {
  OPEN_SELECTED_INGREDIENT,
  CLOSE_SELECTED_INGREDIENT,
  SET_SELECTED_INGREDIENT,
  RESET_SELECTED_INGREDIENT,
} from '../actions/ingredient-details';

// Начальное состояние для редьюсера выбранного ингредиента
const initialState = {
  ingredient: null, // Выбранный ингредиент
  open: false, // Флаг открытого состояния выбранного ингредиента
};

// Редьюсер для управления состоянием выбранного ингредиента
export const selectedIngredientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Обработка действия открытия выбранного ингредиента
    case OPEN_SELECTED_INGREDIENT: {
      return {
        ...state,
        open: true,
      };
    }
    // Обработка действия закрытия выбранного ингредиента
    case CLOSE_SELECTED_INGREDIENT: {
      return {
        ...state,
        open: false,
      };
    }
    // Обработка действия установки выбранного ингредиента
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        open: true,
        ingredient: payload,
      };
    }
    // Обработка действия сброса выбранного ингредиента
    case RESET_SELECTED_INGREDIENT: {
      return {
        ...state,
        ingredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
