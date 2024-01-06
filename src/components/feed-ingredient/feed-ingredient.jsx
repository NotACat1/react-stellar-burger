import React, { useMemo } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedIcon from '../feed-icon/feed-icon';

// Подключение стилей и данных
import styles from './feed-ingredient.module.css';

// Подключение Redux
import { useSelector } from 'react-redux';

// Компонент FeedIngredient принимает id и count в качестве свойств
export default function FeedIngredient({ id, count }) {
  // Получение списка ингредиентов из состояния Redux
  const ingredients = useSelector((state) => state.ingredientsData.ingredients);
  // Использование useMemo для мемоизации данных об ингредиенте по id
  const ingredient = useMemo(() => ingredients.find((ingredients) => ingredients._id === id), [ingredients, id]);

  // Деструктуризация данных об ингредиенте
  const { name, price } = ingredient;

  // Визуальное представление компонента
  return (
    <li className={styles.container}>
      <FeedIcon id={id} />
      <h3 className={`${styles.name} text text_type_main-small`}>{name}</h3>
      <p className={`${styles.price} text text_type_digits-default`}>
        <span>{`${count} x ${price}`}</span>
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
}
