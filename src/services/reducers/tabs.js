// Action Types
import { SET_ACTIVE_TAB, SET_SCROLL_REF_ACTION } from '../actions/tabs';

// Импорт данных для вкладок
import { COMPONENT_TABS } from '../../utils/data';

// Начальное состояние для редьюсера вкладок
const initialState = {
  activeTab: Object.keys(COMPONENT_TABS)[0], // Активная вкладка по умолчанию
  scrollRef: {}, // Ссылки на элементы для прокрутки
};

// Редьюсер для управления состоянием вкладок
export const tabsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // Обработка действия установки активной вкладки
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: payload,
      };
    // Обработка действия установки ссылок на элементы для прокрутки
    case SET_SCROLL_REF_ACTION:
      return {
        ...state,
        scrollRefs: { ...state.scrollRefs, ...payload },
      };
    default:
      return state;
  }
};
