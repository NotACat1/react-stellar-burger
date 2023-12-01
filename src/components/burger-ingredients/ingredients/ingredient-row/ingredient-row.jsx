import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Подключение компонентов
import Ingredient from '../ingredient/ingredient';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { setScrollRefAction } from '../../../../services/actions/tabs';

// Подключение стилей и данных
import styles from './ingredient-row.module.css';
import { COMPONENT_TABS } from '../../../../utils/data';

// Компонент строки с ингредиентами для конкретной вкладки
export default function IngredientsRow({ tab }) {
  // Получение диспетчера Redux и списка ингредиентов
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  // Создание ref для текущей строки
  const rowRef = useRef(null);

  // Фильтрация ингредиентов для текущей вкладки
  const filteredIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === tab),
    [ingredients, tab],
  );

  // Создание компонентов ингредиентов для текущей вкладки
  const ingredientComponents = useMemo(
    () => filteredIngredients.map((ingredient) => <Ingredient key={ingredient._id} data={ingredient} />),
    [filteredIngredients],
  );

  // Эффект для установки ref в состояние Redux
  useEffect(() => {
    dispatch(setScrollRefAction({ [tab]: rowRef }));
  }, [dispatch]);

  return (
    <li ref={rowRef} id={tab} className={styles.row}>
      <h3 className={'mb-6 text text_type_main-medium'}>{COMPONENT_TABS[tab]}</h3>
      <ul className={`${styles.list} mt-6`}>{ingredientComponents}</ul>
    </li>
  );
}

IngredientsRow.propTypes = {
  tab: PropTypes.oneOf(Object.keys(COMPONENT_TABS)).isRequired,
};