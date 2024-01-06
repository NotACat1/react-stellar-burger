import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Подключение компонентов
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector } from 'react-redux';

// Подключение стилей и данных
import styles from './feed-item-price.module.css';

// Компонент, отображающий цену для элемента ленты
export default function FeedItemPrice({ data = [] }) {
  // Получаем доступ к данным о ингредиентах из хранилища
  const ingredients = useSelector((state) => state.ingredientsData.ingredients);

  // Создаем объект-карту, сопоставляющий идентификатор ингредиента его цене
  const ingredientMap = ingredients.reduce((map, ingredient) => {
    map[ingredient._id] = ingredient.price;
    return map;
  }, {});

  // Вычисляем общую стоимость элемента ленты на основе данных и цен ингредиентов
  const totalPrice = data
    .map((ingredientId) => ingredientMap?.[ingredientId] || 0)
    .reduce((acc, price) => acc + price, 0);

  // Возвращаем отформатированный HTML с отображением цены и иконки валюты
  return (
    <p className={`${styles.price} text text_type_digits-default`}>
      <span>{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </p>
  );
}
