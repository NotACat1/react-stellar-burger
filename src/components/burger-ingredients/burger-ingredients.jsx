import React from 'react';

// Подключение компонентов
import Tabs from '../tabs/tabs';
import Ingredients from '../ingredients/ingredients';

// Подключение стилей
import styles from './burger-ingredients.module.css';

// Основной компонент для страницы с ингредиентами
export default function BurgerIngredients() {
  // Отображение компонента, если нет ошибок и данные загружены
  return (
    <section className={`${styles.ingredients} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <Tabs /> {/* Отображение вкладок */}
      <Ingredients /> {/* Отображение ингредиентов */}
    </section>
  );
}
