// Импорт необходимых действий для обработки заказа
import { fetchOrder, fetchOrderFailed, fetchOrderSuccess } from '../actions/order';

// Импорт сервисов для работы с API, управления куки и вспомогательной функции
import apiService from '../../utils/ApiService';
import cookieManager from '../../utils/cookieManager';
import isEmpty from '../../utils/isEmpty';
import { TOKEN_NAMES } from '../../utils/constants';

// Асинхронная функция получения информации о заказе по его номеру
const getOrderInfo = async (number) => {
  try {
    return await apiService.getOrderInfo(number);
  } catch (error) {
    throw new Error(`Не удалось получить информацию о заказе #${number}`);
  }
};

// Экспорт функции для получения информации о заказе
export const getInformationOrder = (number) => async (dispatch) => {
  // Диспатч стартового действия для отображения процесса загрузки заказа
  dispatch(fetchOrder());

  try {
    // Запрос информации о заказе по его номеру
    const { orders } = await getOrderInfo(number);
    const { createdAt, ingredients, name, status } = orders[0];

    // Проверка наличия необходимых данных в полученной информации о заказе
    if (isEmpty(createdAt) || isEmpty(ingredients) || isEmpty(name) || isEmpty(status)) {
      throw new Error(`Получены пустые данные для заказа #${number}`);
    }

    // Диспатч успешного завершения запроса с полученными данными
    dispatch(fetchOrderSuccess(orders[0]));
  } catch (error) {
    // Обработка ошибок API и диспатч действия о неудачном завершении запроса
    apiService.handleApiError(error, dispatch, cookieManager.getCookie(TOKEN_NAMES.refreshToken));
    dispatch(fetchOrderFailed(error));
  }
};
