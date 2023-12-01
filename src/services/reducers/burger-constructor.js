// Функция для генерации уникального ключа
import { generateKey } from '../../utils/generate-key';

// Action Types
import {
  ADD_BUN_BURGER,
  ADD_INGREDIENT_BURGER,
  REMOVE_INGREDIENT_BURGER,
  REMOVE_BUN_BURGER,
  UPDATE_INGREDIENT_ORDER,
} from '../actions/burger-constructor';

// Начальное состояние для редьюсера конструктора бургера
const initialState = {
  bun: {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093c',
  },
  ingredients: [],
};

// Редьюсер конструктора бургера
export const burgerIngredientsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Добавление булки к состоянию
    case ADD_BUN_BURGER: {
      return {
        ...state,
        bun: payload,
      };
    }
    // Добавление ингредиента к состоянию
    case ADD_INGREDIENT_BURGER: {
      const key = generateKey();
      return {
        ...state,
        ingredients: [...state.ingredients, { ...payload, key }],
      };
    }
    // Удаление ингредиента из состояния
    case REMOVE_INGREDIENT_BURGER: {
      const ingredientIndex = state.ingredients.findIndex((ingredient) => ingredient.key === payload);
      if (ingredientIndex !== -1) {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients.splice(ingredientIndex, 1);
        return {
          ...state,
          ingredients: updatedIngredients,
        };
      }
      return state;
    }
    // Редюсер для обновления порядка ингредиентов
    case UPDATE_INGREDIENT_ORDER: {
      const { firstKey, secondKey } = payload;
      // Создаем копию массива ингредиентов
      const updatedIngredients = [...state.ingredients];
      // Находим индексы элементов в массиве
      const indexFirstElement = updatedIngredients.findIndex((ingredient) => ingredient.key === firstKey);
      const indexSecondElement = updatedIngredients.findIndex((ingredient) => ingredient.key === secondKey);
      // Меняем местами объекты в массиве по найденным индексам
      const [movedIngredient] = updatedIngredients.splice(indexFirstElement, 1);
      updatedIngredients.splice(indexSecondElement, 0, movedIngredient);
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }
    // Удаление булки из состояния
    case REMOVE_BUN_BURGER: {
      return {
        ...state,
        bun: null,
      };
    }
    default: {
      return state;
    }
  }
};
