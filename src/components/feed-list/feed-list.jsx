import React from 'react';
import { useLocation } from 'react-router-dom';

// Подключение компонентов
import FeedItem from '../feed-item/feed-item';

// Подключение стилей и данных
import styles from './feed-list.module.css';

// Компонент, отображающий список заказов
export default function FeedList({ data }) {
  const location = useLocation();
  // Формирование класса для списка заказов с применением стилей и кастомной прокруткой
  const listClass = `${styles.list} pr-2 custom-scroll`;

  // Возвращение JSX разметки компонента
  return (
    <div className={styles.container}>
      {/* Список заказов, отображаемых с использованием компонента FeedItem */}
      <ul className={listClass}>
        {data.map((orderData) => (
          <FeedItem key={orderData._id} data={orderData} link={location.pathname} />
        ))}
      </ul>
    </div>
  );
}
