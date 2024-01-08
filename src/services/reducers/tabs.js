// Импорт типов действий для управления вкладками
import { SET_ACTIVE_TAB, SET_SCROLL_REF } from '../types/tabs';

// Импорт констант, связанных с компонентами вкладок
import { COMPONENT_TABS } from '../../utils/constants';

// Получение ключей вкладок из объекта COMPONENT_TABS
const componentTabsKeys = Object.entries(COMPONENT_TABS);

// Начальное состояние хранилища вкладок
const initialState = {
  tabs: componentTabsKeys, // Массив ключей вкладок
  activeTab: componentTabsKeys[0][0], // Активная вкладка по умолчанию
  refs: {}, // Объект для хранения ссылок на элементы
};

// Редуктор для управления состоянием вкладок
export const tabsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_TAB:
      if (COMPONENT_TABS[payload])
        // Обработка действия установки активной вкладки
        return {
          ...state,
          activeTab: payload,
        };
      return {
        ...state,
        activeTab: componentTabsKeys[0][0],
      };
    case SET_SCROLL_REF:
      // Обработка действия установки ссылок на элементы для прокрутки
      return {
        ...state,
        refs: { ...state.refs, ...payload },
      };

    default:
      // Возвращение текущего состояния в случае отсутствия совпадений с типами действий
      return state;
  }
};
