import React, { useMemo, useCallback } from 'react';

// Подключение компонентов
import IngredientsRow from '../ingredients-row/ingredients-row';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../services/actions/tabs';

// Подключение стилей и данных
import styles from './ingredients.module.css';
import { TAB_OFFSET, ROW_HEIGHT_THRESHOLD } from '../../utils/constants';

// Компонент отображения ингредиентов
export default function Ingredients() {
  // Получение диспетчера Redux
  const dispatch = useDispatch();

  // Получение состояний из Redux
  const { tabs: tabsData, activeItem: activeTab, refs: tabsRefs } = useSelector((state) => state.tabsData);

  // Функция для расчета расстояния от верха контейнера до ближайшей вкладки
  const calculateDistanceFromTop = useCallback(
    (containerElement) => {
      const containerRect = containerElement.getBoundingClientRect();
      const tabRefs = tabsData.map(([tabKey, tabName]) => tabsRefs[tabKey].current);

      // Определение последнего элемента вкладки
      const lastTabRef = tabRefs[tabRefs.length - 1];
      const lastTabRect = lastTabRef?.getBoundingClientRect();

      if (lastTabRect && lastTabRect.y + lastTabRect.height <= containerRect.y + containerRect.height + TAB_OFFSET) {
        return lastTabRef.id;
      }

      // Поиск новой активной вкладки на основе расстояния
      const newActiveTabRef = tabRefs.find((tabRef) => {
        const tabRect = tabRef?.getBoundingClientRect();
        return tabRect
          ? tabRect.bottom >= containerRect.top - ROW_HEIGHT_THRESHOLD &&
              tabRect.top <= containerRect.bottom + ROW_HEIGHT_THRESHOLD
          : false;
      });

      return newActiveTabRef ? newActiveTabRef.id : null;
    },
    [tabsRefs, tabsData],
  );

  // Обработчик события скролла
  const scrollHandler = useCallback(
    (event) => {
      // Вызываем функцию для расчета активной вкладки
      const newActiveTab = calculateDistanceFromTop(event.currentTarget);

      // Обновление активной вкладки в Redux
      if (newActiveTab && newActiveTab !== activeTab) {
        dispatch(setActiveTab(newActiveTab));
      }
    },
    [calculateDistanceFromTop, dispatch, activeTab],
  );

  // Создание компонентов строк с ингредиентами
  const ingredientRows = useMemo(
    () => tabsData.map(([tabKey, tabName]) => <IngredientsRow key={tabKey} data={{ tabKey, tabName }} />),
    [tabsData],
  );

  // Класс контейнера для стилей
  const containerClassName = `${styles.container} custom-scroll mt-10 pr-2`;

  return (
    // Контейнер для списка ингредиентов с обработчиком события скролла
    <ul onScroll={scrollHandler} className={containerClassName}>
      {ingredientRows}
    </ul>
  );
}
