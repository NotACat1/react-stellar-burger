import React from 'react';
import PropTypes from 'prop-types';

// Подключение стилей и данных
import styles from './alert.module.css';

// Компонент Alert принимает три свойства: title, text и image.
export default function Alert({ title, text, image }) {
  // Извлекаем свойства src и alt из объекта image.
  const { src, alt } = image;

  // Возвращаем JSX разметку компонента Alert.
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {/* Выводим изображение с классом styles.image и добавляем отступ mb-6. */}
        <img className={`${styles.image} mb-6`} src={src} alt={alt} />

        {/* Заголовок с классом styles.text, текстовым стилем text_type_main-medium и отступом mb-6. */}
        <h1 className={`${styles.text} text text_type_main-medium mb-6`}>{title}</h1>

        {/* Параграф с классом styles.text, текстовым стилем text_type_main-default и неактивным цветом текста. */}
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{text}</p>
      </div>
    </div>
  );
}

// Определение PropTypes для компонента Alert.
Alert.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
