// ======== Action Types ========
export const ADD_BUN_BURGER = 'ADD_BUN_BURGER';
export const ADD_INGREDIENT_BURGER = 'ADD_INGREDIENT_BURGER';
export const REMOVE_INGREDIENT_BURGER = 'REMOVE_INGREDIENT_BURGER';
export const REMOVE_BUN_BURGER = 'REMOVE_BUN_BURGER';
export const UPDATE_INGREDIENT_ORDER = 'UPDATE_INGREDIENT_ORDER';

// ======== Action Creators ========
// Создает действие для добавления булки в конструктор бургера
export const addBunBurger = (bun) => ({
  type: ADD_BUN_BURGER,
  payload: bun,
});

// Создает действие для добавления ингредиента в конструктор бургера
export const addIngredientBurger = (ingredient) => ({
  type: ADD_INGREDIENT_BURGER,
  payload: ingredient,
});

// Создает действие для удаления ингредиента из конструктора бургера
export const removeIngredientBurger = (ingredientIndex) => ({
  type: REMOVE_INGREDIENT_BURGER,
  payload: ingredientIndex,
});

// Создает действие для удаления булки из конструктора бургера
export const removeBunBurger = () => ({
  type: REMOVE_BUN_BURGER
});

// Создает действие для обновления порядка ингредиентов
export const updateIngredientOrder = (startIndex, endIndex) => ({
  type: UPDATE_INGREDIENT_ORDER,
  payload: { startIndex, endIndex },
});