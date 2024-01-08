// Middleware для работы с WebSocket
export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null; // Инициализация переменной для хранения объекта WebSocket

    const { dispatch, getState } = store; // Получение функций dispatch и getState из хранилища
    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions; // Извлечение типов действий WebSocket из параметров

    return (next) => (action) => {
      const { type } = action; // Извлечение типа действия из параметра

      // Извлечение данных пользователя из состояния хранилища
      const { userData } = getState();

      // Инициализация WebSocket при получении действия wsInit
      if (type === wsInit) {
        const token = userData?.accessToken?.replace('Bearer ', ''); // Извлечение токена из данных пользователя
        socket = new WebSocket(`${wsUrl}?token=${token}`); // Создание объекта WebSocket с передачей токена в URL
      }

      // Закрытие WebSocket при получении действия onClose
      if (type === onClose) {
        socket && socket.close(1000, 'CLOSE_NORMAL'); // Проверка наличия WebSocket перед закрытием
      }

      // Обработка событий WebSocket, если объект WebSocket инициализирован
      if (socket) {
        // Обработка события открытия соединения
        socket.onopen = (event) => dispatch({ type: onOpen, payload: event });

        // Обработка события ошибки соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // Обработка события получения сообщения
        socket.onmessage = (event) => {
          const { data } = event;
          const { success, ...restParsedData } = JSON.parse(data); // Парсинг JSON-данных из сообщения
          dispatch({ type: onMessage, payload: restParsedData });
        };

        // Обработка события закрытия соединения
        socket.onclose = (event) => dispatch({ type: onClose, payload: event });
      }

      next(action); // Передача действия следующему middleware в цепочке
    };
  };
};
