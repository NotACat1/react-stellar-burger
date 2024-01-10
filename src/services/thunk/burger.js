// Импорт необходимых действий (actions) из файла burger.js
import { deleteAllIngredients, sendOrder, sendOrderFailed, sendOrderSuccess, setOrderState } from '../actions/burger';

// Импорт объекта apiService из утилиты ApiService
import apiService from '../../utils/ApiService';
// Импорт объекта cookieManager из утилиты cookieManager
import cookieManager from '../../utils/cookieManager';

// Импорт константы имени куки для обновления токена
import { TOKEN_NAMES } from '../../utils/constants';

// Экспорт функции sendNewOrder, принимающей accessToken и ingredients, а возвращающей функцию
export const sendNewOrder = (accessToken, ingredients) => async (dispatch) => {
  // Диспатч действия sendOrder для уведомления о начале отправки заказа
  dispatch(sendOrder());
  try {
    // Отправка ингредиентов на сервер с использованием apiService
    const newOrderData = await apiService.sendIngredients(accessToken, ingredients);

    // Диспатч действия sendOrderSuccess с номером успешно созданного заказа
    dispatch(sendOrderSuccess(newOrderData.order.number));

    dispatch(setOrderState(true));

    // Диспатч действия deleteAllIngredients для удаления всех ингредиентов из заказа
    dispatch(deleteAllIngredients());
  } catch (error) {
    // Обработка ошибки через apiService и передача дополнительных параметров
    apiService.handleApiError(error, dispatch, cookieManager.getCookie(TOKEN_NAMES.refreshToken));

    // Диспатч действия sendOrderFailed с переданной ошибкой
    dispatch(sendOrderFailed(error));
  }
};
