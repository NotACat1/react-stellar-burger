import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';

function Ingredient({ children }) {
  return (
    <li className={styles.ingredient}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className={`${styles.images} pl-4 pr-4 mb-2`} src={children.image} alt={children.name} />
      <div className={`mt-2 mb-2 ${styles.price}`}>
        <p className="text text_type_digits-default">{children.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`mt-2 ${styles.description} text text_type_main-default`}>{children.name}</p>
    </li>
  );
}

export default Ingredient;
