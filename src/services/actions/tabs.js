// ======== Action Types ========
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_SCROLL_REF_ACTION = 'SET_SCROLL_REF_ACTION';

// ======== Action Creators ========
// Устанавливает активную вкладку
export const setActiveTab = (activeTab) => ({
  type: SET_ACTIVE_TAB,
  payload: activeTab,
});

// Устанавливает ссылку на элемент скролла для конкретной вкладки
export const setScrollRefAction = (scrollRef) => ({
  type: SET_SCROLL_REF_ACTION,
  payload: scrollRef,
});
