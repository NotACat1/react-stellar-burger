import React, { useMemo, useCallback } from 'react';

// Подключение компонентов
import IngredientsRow from './ingredient-row/ingredient-row';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../../services/actions/tabs';

// Подключение стилей и данных
import styles from './ingredients.module.css';
import { COMPONENT_TABS, TAB_OFFSET, ROW_HEIGHT_THRESHOLD } from '../../../utils/data';

// Компонент отображения ингредиентов
export default function Ingredients() {
  // Получение диспетчера Redux
  const dispatch = useDispatch();

  // Получение состояний из Redux
  const { activeTab, scrollRefs } = useSelector((state) => state.tabs);

  // Массив ключей для вкладок
  const tabKeys = Object.keys(COMPONENT_TABS);

  // Функция для расчета расстояния от верха контейнера до ближайшей вкладки
  const calculateDistanceFromTop = useCallback(
    (targetElement) => {
      const containerRect = targetElement.getBoundingClientRect();
      const tabRefs = tabKeys.map((tab) => scrollRefs[tab].current);

      const lastTabRef = tabRefs[tabRefs.length - 1];
      const lastTabRect = lastTabRef?.getBoundingClientRect();

      if (lastTabRect && lastTabRect.y + lastTabRect.height <= containerRect.y + containerRect.height + TAB_OFFSET) {
        return lastTabRef.id;
      }

      const newTabRef = tabRefs.find((tabRef) => {
        const tabRect = tabRef?.getBoundingClientRect();
        return tabRect
          ? tabRect.bottom >= containerRect.top - ROW_HEIGHT_THRESHOLD &&
              tabRect.top <= containerRect.bottom + ROW_HEIGHT_THRESHOLD
          : false;
      });

      return newTabRef ? newTabRef.id : null;
    },
    [tabKeys, scrollRefs],
  );

  // Обработчик события скролла
  const scrollHandler = useCallback(
    (event) => {
      const newRow = calculateDistanceFromTop(event.currentTarget);
      newRow && newRow !== activeTab && dispatch(setActiveTab(newRow));
    },
    [calculateDistanceFromTop, dispatch, activeTab],
  );

  // Создание компонентов строк с ингредиентами
  const ingredientsRows = useMemo(() => tabKeys.map((tab) => <IngredientsRow key={tab} tab={tab} />), [tabKeys]);

  // Класс контейнера для стилей
  const containerClassName = `${styles.container} mt-10 pr-2 pl-4`;

  return (
    <ul onScroll={scrollHandler} className={containerClassName}>
      {ingredientsRows}
    </ul>
  );
}
