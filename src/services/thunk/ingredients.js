// Импорт необходимых действий (actions) из файла 'ingredients'
import { fetchIngredients, fetchIngredientsFailed, fetchIngredientsSuccess } from '../actions/ingredients';

// Импорт службы API из утилитарного модуля 'ApiService'
import apiService from '../../utils/ApiService';

// Экспорт функции для получения ингредиентов
export const getIngredients = () => async (dispatch) => {
  // Диспатчим действие о начале загрузки ингредиентов
  dispatch(fetchIngredients());
  try {
    // Получаем данные об ингредиентах с использованием API-сервиса
    const ingredientsData = await apiService.getIngredients();
    
    // Проверяем, получены ли данные об ингредиентах
    if (ingredientsData) {
      // Если данные получены, диспатчим действие об успешном завершении загрузки с передачей данных
      dispatch(fetchIngredientsSuccess(ingredientsData.data));
    } else {
      // Если данные не получены, выбрасываем ошибку
      throw new Error('Ошибка при получении ингредиентов');
    }
  } catch (error) {
    // В случае ошибки диспатчим действие об ошибке с передачей объекта ошибки
    dispatch(fetchIngredientsFailed(error));
  }
};
