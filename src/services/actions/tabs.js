import { SET_ACTIVE_TAB, SET_SCROLL_REF } from '../types/tabs';

// Устанавливает активную вкладку
export const setActiveTab = (tab) => ({ type: SET_ACTIVE_TAB, payload: tab });

// Устанавливает ссылку на прокрутку
export const setScrollRef = (ref) => ({ type: SET_SCROLL_REF, payload: ref });
