// ======== Action Types ========
export const OPEN_SELECTED_INGREDIENT = 'OPEN_SELECTED_INGREDIENT';
export const CLOSE_SELECTED_INGREDIENT = 'CLOSE_SELECTED_INGREDIENT';
export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT';
export const RESET_SELECTED_INGREDIENT = 'RESET_SELECTED_INGREDIENT';

// ======== Action Creators ========
// Открывает модальное окно с деталями выбранного ингредиента
export const openSelectedIngredient = ({
  name = '',
  proteins = 0,
  fat = 0,
  carbohydrates = 0,
  calories = 0,
  image = '',
}) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_INGREDIENT,
    payload: {
      name,
      image,
      energy: [
        { name: 'Калории,ккал', value: proteins },
        { name: 'Белки, г', value: fat },
        { name: 'Жиры, г', value: carbohydrates },
        { name: 'Углеводы, г', value: calories },
      ],
    },
  });
  dispatch({ type: OPEN_SELECTED_INGREDIENT });
};

// Закрывает модальное окно с деталями выбранного ингредиента
export const closeSelectedIngredient = () => (dispatch) => {
  dispatch({ type: RESET_SELECTED_INGREDIENT, payload: null });
  dispatch({ type: CLOSE_SELECTED_INGREDIENT });
};
