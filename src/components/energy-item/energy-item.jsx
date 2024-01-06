import React from 'react';

// Подключение стилей и данных
import styles from './energy-item.module.css';
import PropTypes from 'prop-types';

// Компонент отображения числовых показатель ингридиента
export default function EnergyItem({ data }) {
  // Деструктуризация свойств для улучшения читаемости кода
  const { label, amount } = data;

  return (
    <li className={styles.energyItem}>
      {/* Отображение метки ингредиента */}
      <p className="text text_type_main-default text_color_inactive mb-2">{label}</p>
      {/* Отображение отформатированного числового значения ингредиента */}
      <p className="text text_type_digits-default text_color_inactive mt-2">{amount}</p>
    </li>
  );
}

//EnergyItem.propTypes = {
//  label: PropTypes.string.isRequired,
//  amount: PropTypes.number.isRequired,
//};
