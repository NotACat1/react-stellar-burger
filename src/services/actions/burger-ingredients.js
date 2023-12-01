import { getFetchIngredientsRequest } from '../api';

// ======== Action Types ========
export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE';

// ======== Action Creators ========
// Создатель действия для указания начала запроса на получение ингредиентов
export const fetchIngredientsRequest = () => ({ type: FETCH_INGREDIENTS_REQUEST });

// Создатель действия для указания успешного завершения запроса на получение ингредиентов
export const getIngredientsSuccess = (ingredients) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: ingredients,
});

// Создатель действия для указания неудачного завершения запроса на получение ингредиентов
export const getIngredientsFailure = (error) => ({
  type: GET_INGREDIENTS_FAILURE,
  payload: error,
});

// ======== Thunk Action ========
// Запускает процесс получения списка ингредиентов
export const getIngredients = () => async (dispatch) => {
  dispatch(fetchIngredientsRequest());
  try {
    const ingredients = await getFetchIngredientsRequest();
    if (ingredients && ingredients.success) {
      dispatch(getIngredientsSuccess(ingredients.data));
    } else {
      throw new Error('Ошибка при получении ингредиентов');
    }
  } catch (error) {
    dispatch(getIngredientsFailure(error.message));
  }
};
