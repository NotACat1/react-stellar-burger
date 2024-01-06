import React from 'react';

// Подключение стилей и данных
import styles from './feed-summary-item.module.css';

// Функция для рендеринга суммарной информации
export default function FeedSummaryItem({ title, value }) {
  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <p className={`${styles.text_shadow} text text_type_digits-large`}>{value}</p>
    </div>
  );
}
