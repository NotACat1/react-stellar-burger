import { postFetchBurgerRequest } from '../api';

// ======== Action Types ========
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

// ======== Action Creators ========
// Создатель действия для указания начала запроса на создание заказа
export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
// Создатель действия для указания успешного завершения запроса на создание заказа
export const createOrderSuccess = (data) => ({ type: CREATE_ORDER_SUCCESS, payload: data });
// Создатель действия для указания неудачного завершения запроса на создание заказа
export const createOrderFailure = (error) => ({ type: CREATE_ORDER_FAILURE, payload: error });
// Создатель действия для закрытия модального окна заказа
export const closeOrderModal = () => ({ type: CLOSE_ORDER_MODAL });

// ======== Thunk Action ========
// Отправляет POST-запрос на сервер с указанными ингредиентами для создания заказа
export const createOrder = (ingredients) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const order = await postFetchBurgerRequest(ingredients);
    if (order && order.success) {
      console.log(order);
      dispatch(createOrderSuccess(order.order));
      console.log('5');
    } else {
      throw new Error('Ошибка при создании заказа');
    }
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};
