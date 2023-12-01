import React from 'react';

// Подключение компонентов
import PriceBox from './price-box/price-box';
import Burger from './burger/burger';

// Подключение стилей и данных
import styles from './burger-constructor.module.css';

// Основной компонент для страницы с ингредиентами бургера
export default function BurgerConstructor() {
  return (
    <section className={`${styles.constructor} pt-10`}>
      <Burger />
      <PriceBox />
    </section>
  );
}
