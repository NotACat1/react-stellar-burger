import React, { useMemo } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

// Подключение компонентов
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FeedIcon from '../feed-icon/feed-icon';
import FeedItemPrice from '../feed-item-price/feed-item-price';

// Подключение стилей и данных
import styles from './feed-item.module.css';
import formatDateTime from '../../utils/formatDateTime';
import isEmpty from '../../utils/isEmpty';

export default function FeedItem({ data }) {
  const location = useLocation(); // Получаем объект местоположения из библиотеки React Router
  const navigate = useNavigate(); // Получаем функцию для навигации из библиотеки React Router

  const { createdAt: date, name, ingredients, number } = data; // Деструктуризация объекта данных

  // Обработчик клика по элементу списка
  const handleClick = (evt) => {
    const state = { background: location }; // Создаем объект состояния для передачи в навигацию
    navigate(`${number}`, { state }); // Переходим на страницу с номером элемента списка
  };

  // Функция для отображения ингредиентов
  const renderIngredients = () => {
    const firstFive = ingredients.slice(0, 5); // Получаем первые пять ингредиентов
    const remaining = ingredients.slice(5); // Получаем оставшиеся ингредиенты

    // Отображаем первые пять ингредиентов с использованием map
    const renderedFirstFive = firstFive.map((id, index) => (
      <li key={index} style={{ marginRight: '-20px' }}>
        <FeedIcon zIndex={ingredients.length - index} id={id} hover={false} />
      </li>
    ));

    // Добавляем оставшиеся ингредиенты, если они существуют
    const renderedRemaining = !isEmpty(remaining) && (
      <li>
        <FeedIcon
          col={remaining.length}
          id={remaining[0]}
          zIndex={ingredients.length - firstFive.length}
          hover={false}
        />
      </li>
    );

    // Возвращаем массив с отрендеренными элементами
    return [renderedFirstFive, renderedRemaining];
  };

  return (
    <li onClick={handleClick} className={`${styles.container} p-6`}>
      <div className={styles.line}>
        <p className={`${styles.number} text text_type_digits-default`}>{number}</p>
        <p className="text text_type_main-default text_color_inactive">{formatDateTime(date)}</p>
      </div>
      <h2 className="text text_type_main-medium">{name}</h2>
      <div className={styles.line}>
        <ul className={styles.list}>{renderIngredients()}</ul>
        <FeedItemPrice data={ingredients} />
      </div>
    </li>
  );
}
