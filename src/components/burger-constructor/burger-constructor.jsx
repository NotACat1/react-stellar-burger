import React from 'react';

// Подключение компонентов
import PriceBox from '../burger-price/burger-price';
import Burger from '../burger/burger';

// Подключение Redux
import { useSelector } from 'react-redux';

// Подключение стилей и данных
import styles from './burger-constructor.module.css';
import isEmpty from '../../utils/isEmpty';

// Основной компонент для страницы с ингредиентами бургера
export default function BurgerConstructor() {
  // Используем хук useSelector для получения данных из Redux-стейта
  const { bun: burgerBun, ingredients: burgerIngredients } = useSelector((state) => state.burgerData);

  // Проверка на наличие булки и ингредиентов перед отображением PriceBox
  const shouldRenderPriceBox = !isEmpty(burgerBun) && !isEmpty(burgerIngredients);

  return (
    // Основной контейнер для компонента конструктора
    <section className={`${styles.constructor} pt-25 pb-10`}>
      {/* Отображение компонента Burger */}
      <Burger />
      {/* Отображение компонента PriceBox, если необходимо */}
      {shouldRenderPriceBox && <PriceBox />}
    </section>
  );
}
