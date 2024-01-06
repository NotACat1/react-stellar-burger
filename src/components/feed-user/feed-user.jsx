import React, { useEffect } from 'react';

// Подключение компонентов
import RenderContent from '../render-content/render-content';
import FeedList from '../feed-list/feed-list';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { wsUserOrdersConnectionStart, wsUserOrdersConnectionClosed } from '../../services/actions/user';

// Подключение стилей и данных
import styles from './feed-user.module.css';
import { ERRORS } from '../../utils/constants';

// Компонент, отображающий информацию о заказах пользователя
export default function FeedUser() {
  const dispatch = useDispatch();

  // Получение данных о заказах, состояния загрузки и ошибки из глобального состояния
  const { orders, isLoading, hasConnectionFailed } = useSelector((state) => state.userData);

  // useEffect для управления WebSocket-соединением при монтировании и размонтировании компонента
  useEffect(() => {
    // Запуск WebSocket-соединения при монтировании компонента
    dispatch(wsUserOrdersConnectionStart());

    // Закрытие WebSocket-соединения при размонтировании компонента
    return () => {
      dispatch(wsUserOrdersConnectionClosed());
    };
  }, [dispatch]); // Зависимость - dispatch

  // Отображение компонента, содержащего список заказов, с учетом состояния загрузки и ошибок
  return (
    <div className={styles.container}>
      {/* Использование компонента RenderContent для обработки состояний загрузки и ошибок */}
      <RenderContent isLoading={isLoading} hasError={hasConnectionFailed} error={ERRORS.userOrders}>
        {/* Передача данных о заказах в компонент FeedList для отображения списка */}
        <FeedList data={orders} />
      </RenderContent>
    </div>
  );
}
