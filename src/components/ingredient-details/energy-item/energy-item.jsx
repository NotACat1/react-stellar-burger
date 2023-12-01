import React from 'react';

// Подключение стилей и данных
import styles from './energy-item.module.css';
import PropTypes from 'prop-types';

// Компонент отображения числовых показатель ингридиента
export default function EnergyItem({ title, value }) {
  return (
    <li className={styles.item}>
      <p className="text text_type_main-default text_color_inactive mb-2">{title}</p>
      <p className="text text_type_digits-default text_color_inactive mt-2">{value}</p>
    </li>
  );
}

EnergyItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
