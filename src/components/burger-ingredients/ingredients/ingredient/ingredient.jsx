import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { ingredientPropType } from '../../../../utils/prop-types.js';

export default function Ingredient({ data, onCardClick }) {
  const handleClick = () => {
    onCardClick(data);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <li onClick={handleClick} onKeyPress={handleKeyPress} className={styles.ingredient}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className={`${styles.images} pl-4 pr-4 mb-2`} src={data.image} alt={data.name} />
      <div className={`mt-2 mb-2 ${styles.price}`}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`mt-2 ${styles.description} text text_type_main-default`}>{data.name}</p>
    </li>
  );
}

Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
