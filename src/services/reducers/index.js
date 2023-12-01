import { combineReducers } from 'redux';

// Подключение отдельных редюсеров
import { ingredientsReducer } from './burger-ingredients'; // Редюсер ингредиентов
import { burgerIngredientsReducer } from './burger-constructor'; // Редюсер ингредиентов бургера
import { selectedIngredientReducer } from './ingredient-details'; // Редюсер выбранного ингредиента
import { orderReducer } from './order-details'; // Редюсер заказов
import { tabsReducer } from './tabs'; // Редюсер вкладок

// Корневой редюсер, объединяющий все редюсеры
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer, // Хранилище ингредиентов
  burgerIngredients: burgerIngredientsReducer, // Хранилище бургерных ингредиентов
  selectedIngredient: selectedIngredientReducer, // Хранилище выбранного ингредиента
  createdOrder: orderReducer, // Хранилище заказа
  tabs: tabsReducer, // Хранилище вкладок
});
