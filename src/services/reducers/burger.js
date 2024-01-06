// Импорт констант для действий с бургером
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
} from '../types/burger';

// Начальное состояние хранилища для бургера
const initialState = {
  bun: {}, // Информация о булке
  ingredients: [], // Массив ингредиентов
  isRequesting: false, // Флаг отправки заказа
  hasRequestFailed: false, // Флаг неудачной отправки заказа
  order: {}, // Информация о заказе
  errors: [], // Массив ошибок
  isOrder: false, // Флаг отправки заказа
};

// Редуктор для управления состоянием хранилища бургера
export const burgerReducer = (state = initialState, { type, payload }) => {
  // Обработка различных действий с бургером
  switch (type) {
    // Добавление ингредиента
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      };
    }
    // Добавление булки
    case ADD_BUN: {
      return {
        ...state,
        bun: payload,
      };
    }
    // Удаление ингредиента
    case DELETE_INGREDIENT: {
      if (payload.type === 'bun') {
        return {
          ...state,
          bun: {},
        };
      }

      const updatedIngredients = state.ingredients.filter((ingredient) => ingredient.uuid !== payload);

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }
    // Удаление всех ингредиентов
    case DELETE_ALL_INGREDIENTS: {
      return {
        ...state,
        bun: {},
        ingredients: [],
      };
    }
    // Сортировка ингредиентов
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...payload],
      };
    }
    // Отправка заказа
    case SEND_ORDER: {
      return {
        ...state,
        isRequesting: true,
        hasRequestFailed: false,
        order: {},
        errors: [],
      };
    }
    // Ошибка при отправке заказа
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        isRequesting: false,
        hasRequestFailed: true,
        errors: [...state.errors, payload],
      };
    }
    // Успешная отправка заказа
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        order: payload,
      };
    }
    case SET_ORDER_STATE: {
      return {
        ...state,
        isOrder: payload,
      };
    }
    // Если действие не определено, возвращаем текущее состояние
    default: {
      return state;
    }
  }
};
