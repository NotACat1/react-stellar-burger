import React, { useMemo, useCallback } from 'react';

// Подключение компонентов
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../../services/actions/tabs';

// Подключение стилей и данных
import styles from './tabs.module.css';
import { COMPONENT_TABS } from '../../../utils/data';

// Компонент вкладок для выбора категории ингредиентов
export default function Tabs() {
  // Получение диспетчера Redux и активной вкладки и ссылок на элементы
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tabs.activeTab);
  const scrollRefs = useSelector((state) => state.tabs.scrollRefs);

  // Массив ключей для вкладок
  const tabKeys = Object.keys(COMPONENT_TABS);

  // Функция прокрутки к выбранной вкладке
  const scrollToTab = useCallback((scrollRef) => {
    scrollRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, []);

  // Обработчик изменения вкладки
  const handleTabChange = useCallback(
    (selectedTab) => {
      dispatch(setActiveTab(selectedTab));
      scrollToTab(scrollRefs[selectedTab]);
    },
    [dispatch, scrollToTab, scrollRefs],
  );

  // Создание элементов вкладок
  const tabElements = useMemo(
    () =>
      tabKeys.map((tab) => (
        <Tab key={tab} value={tab} active={activeTab === tab} onClick={() => handleTabChange(tab)}>
          {COMPONENT_TABS[tab]}
        </Tab>
      )),
    [tabKeys, activeTab, handleTabChange],
  );

  return <div className={`${styles.tabs} mt-5 mb-10`}>{tabElements}</div>;
}
