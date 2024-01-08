// Импорт типов действий для ингредиентов
import { FETCH_INGREDIENTS, FETCH_INGREDIENTS_FAILED, FETCH_INGREDIENTS_SUCCESS } from '../types/ingredients';

// Действие для запроса ингредиентов
export const fetchIngredients = () => ({ type: FETCH_INGREDIENTS });

// Действие при успешном получении ингредиентов
export const fetchIngredientsSuccess = (data) => ({ type: FETCH_INGREDIENTS_SUCCESS, payload: data });

// Действие при неудачном получении ингредиентов
export const fetchIngredientsFailed = (error = 'Unknown error') => ({ type: FETCH_INGREDIENTS_FAILED, payload: error });
