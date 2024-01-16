import { combineReducers } from 'redux';

// Подключение отдельных редюсеров
import { ingredientsReducer } from './ingredients'; // Редюсер ингредиентов
import { tabsReducer } from './tabs';
import { burgerReducer } from './burger';
import { userReducer } from './user';
import { ordersReducer } from './orders';
import { orderReducer } from './order';

// Корневой редюсер, объединяющий все редюсеры
export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  tabsData: tabsReducer,
  burgerData: burgerReducer,
  userData: userReducer,
  ordersData: ordersReducer,
  orderData: orderReducer,
});
