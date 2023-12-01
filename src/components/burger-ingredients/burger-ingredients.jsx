import React, { useEffect } from 'react';

// Подключение компонентов
import Tabs from './tabs/tabs';
import Ingredients from './ingredients/ingredients';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';

// Подключение стилей
import styles from './burger-ingredients.module.css';

// Основной компонент для страницы с ингредиентами
export default function BurgerIngredients() {
  // Получение диспетчера Redux и состояние загрузки и ошибок
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ingredients.loading);
  const error = useSelector((state) => state.ingredients.error);

  // Эффект, выполняющий запрос на получение ингредиентов при загрузке компонента
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  // Отображение компонента, если нет ошибок и данные загружены
  return (
    error === null &&
    !loading && (
      <section className={styles.ingredients}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <Tabs />
        <Ingredients />
      </section>
    )
  );
}
