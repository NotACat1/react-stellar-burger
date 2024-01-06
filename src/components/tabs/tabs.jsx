import React, { useMemo, useCallback } from 'react';

// Подключение компонентов
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../services/actions/tabs';

// Подключение стилей и данных
import styles from './tabs.module.css';
import scrollToRef from '../../utils/scrollToRef';

// Компонент вкладок для выбора категории ингредиентов
export default function Tabs() {
  // Получение диспетчера Redux и активной вкладки и ссылок на элементы
  const dispatch = useDispatch();
  const { tabs: itemsTabs, activeTab, refs: refsTabs } = useSelector((state) => state.tabsData);

  // Обработчик изменения вкладки
  const handleTabChange = useCallback(
    (tab) => {
      // Установка активной вкладки в Redux
      dispatch(setActiveTab(tab));

      // Прокрутка к выбранной вкладке
      scrollToRef(refsTabs[tab]);
    },
    [dispatch, refsTabs],
  );

  // Создание элементов вкладок
  const tabsElements = useMemo(
    () =>
      itemsTabs.map(([keyTab, nameTab]) => (
        <Tab key={keyTab} value={keyTab} active={activeTab === keyTab} onClick={() => handleTabChange(keyTab)}>
          {nameTab}
        </Tab>
      )),
    [itemsTabs, activeTab, handleTabChange],
  );

  return <div className={`${styles.tabs} mt-5 mb-10`}>{tabsElements}</div>;
}
