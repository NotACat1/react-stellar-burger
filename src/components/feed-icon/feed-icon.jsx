import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Подключение стилей и данных
import styles from './feed-icon.module.css';

// Подключение Redux
import { useSelector } from 'react-redux';

// Компонент FeedIcon, представляющий иконку ингредиента в ленте
export default function FeedIcon({ id, zIndex, col }) {
  // Получение списка ингредиентов из глобального состояния приложения
  const ingredients = useSelector((state) => state.ingredientsData.ingredients);

  // Поиск ингредиента по id и извлечение из него необходимых данных (изображение и имя)
  const { image_mobile: image, name } = useMemo(() => ingredients.find((ingredient) => ingredient._id === id), [ingredients, id]);

  // Формирование класса изображения на основе условий (добавление класса при наличии col)
  const imageClassName = `${styles.image} ${col && styles.image_black}`;

  // Возвращение разметки компонента
  return (
    <div className={styles.container} style={{ zIndex }}>
      {/* Отображение изображения ингредиента */}
      <img className={imageClassName} src={image} alt={name} />

      {/* Отображение текста (если передан параметр col) */}
      {col && <p className={`${styles.text} text text_type_main-default`}>{col}</p>}
    </div>
  );
}

// Определение PropTypes для компонента
FeedIcon.propTypes = {
  id: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired,
  col: PropTypes.number,
};