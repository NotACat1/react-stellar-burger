import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Подключение компонентов
import Ingredient from '../ingredient/ingredient';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { setScrollRef } from '../../services/actions/tabs';

// Подключение стилей и данных
import styles from './ingredients-row.module.css';
import shallowEqual from '../../utils/shallowEqual';

// Компонент строки с ингредиентами для конкретной вкладки
export default function IngredientsRow({ data }) {
  // Получение диспетчера Redux и списка всех ингредиентов
  const dispatch = useDispatch();
  const allIngredients = useSelector((state) => state.ingredientsData.ingredients, shallowEqual);

  // Разделение данных вкладки на ключ и название
  const { tabKey, tabName } = data;

  // Создание ref для текущей строки
  const rowRef = useRef(null);

  // Фильтрация ингредиентов для текущей вкладки
  const filteredIngredients = useMemo(
    () => allIngredients.filter((ingredient) => ingredient.type === tabKey),
    [allIngredients, tabKey],
  );

  // Создание компонентов ингредиентов для текущей вкладки
  const ingredientComponents = useMemo(
    () => filteredIngredients.map((ingredient) => <Ingredient key={ingredient._id} data={ingredient} />),
    [filteredIngredients],
  );

  // Эффект для установки ref в состояние Redux
  useEffect(() => {
    // Обновление ref в Redux для использования в других частях приложения
    dispatch(setScrollRef({ [tabKey]: rowRef }));
  }, [dispatch, rowRef, tabKey]);

  return (
    // Компонент строки списка ингредиентов
    <li ref={rowRef} id={tabKey} className={styles.row}>
      {/* Название вкладки */}
      <h2 className={'mb-6 text text_type_main-medium'}>{tabName}</h2>
      {/* Список компонентов ингредиентов */}
      <ul className={`${styles.list} mt-6`}>{ingredientComponents}</ul>
    </li>
  );
}

// Определение PropTypes для компонента
IngredientsRow.propTypes = {
  data: PropTypes.shape({
    tabKey: PropTypes.string.isRequired,
    tabName: PropTypes.string.isRequired,
  }).isRequired,
};
