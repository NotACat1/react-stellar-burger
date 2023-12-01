import React, { useMemo } from 'react';

// Подключение компонентов
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../../services/actions/order-details';

// Подключение стилей и данных
import styles from './price-box.module.css';

// Компонент для отображения цены бургера и кнопки оформления заказа
export default function PriceBox() {
  // Получение диспетчера Redux
  const dispatch = useDispatch();
  // Получаем данные о булочке и ингредиентах из Redux-стейта
  const { bun, ingredients } = useSelector((state) => state.burgerIngredients);

  // Создаем массив идентификаторов ингредиентов для заказа
  const order = [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id];

  // Рассчитываем общую стоимость бургера с помощью useMemo
  const price = useMemo(() => {
    // Учитываем стоимость булочки (если выбрана) и всех ингредиентов
    const bunPrice = bun ? bun.price : 0;
    const ingredientsPrice = ingredients.reduce((total, ingredient) => total + ingredient.price, 0);
    return bunPrice * 2 + ingredientsPrice;
  }, [bun, ingredients]);

  // Обработчик клика по кнопке оформления заказа
  const handleOrderButtonClick = () => {
    dispatch(createOrder(order));
  };

  return (
    <div className={`${styles.container} mt-5 pr-4`}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" htmlType="button" onClick={handleOrderButtonClick}>
        Оформить заказ
      </Button>
    </div>
  );
}
