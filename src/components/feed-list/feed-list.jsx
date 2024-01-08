import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// Подключение компонентов
import FeedItem from '../feed-item/feed-item';
import EmptyBurgerMessage from '../empty-burger-message/empty-burger-message';

// Подключение стилей и данных
import styles from './feed-list.module.css';
import { orderPropType } from '../../utils/prop-types';

// Компонент, отображающий список заказов
export default function FeedList({ data }) {
  const location = useLocation();
  // Формирование класса для списка заказов с применением стилей и кастомной прокруткой
  const listClass = `${styles.list} pr-2 custom-scroll`;

  const feedItems = useMemo(() => {
    return data.map((orderData) => <FeedItem key={orderData._id} data={orderData} link={location.pathname} />);
  }, [data, location.pathname]);

  // Возвращение JSX разметки компонента
  return (
    <div className={styles.container}>
      {/* Список заказов, отображаемых с использованием компонента FeedItem */}
      {data.length === 0 ? (
        <EmptyBurgerMessage message="Список заказов пуст" />
      ) : (
        <ul className={listClass}>{feedItems}</ul>
      )}
    </div>
  );
}

// Определение PropTypes для компонента
FeedList.propTypes = {
  data: PropTypes.arrayOf(orderPropType),
};
