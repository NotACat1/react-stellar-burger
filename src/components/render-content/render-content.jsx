import React from 'react';
import PropTypes from 'prop-types';

// Подключение компонентов
import Loader from '../loader/loader';
import Alert from '../alert/alert';

// Основной компонент приложения
export default function RenderContent({ isLoading, hasError, error, children }) {
  // Проверка наличия загрузки данных
  if (isLoading) {
    // Вывод прелоадера во время загрузки данных
    return <Loader />;
  }

  // Проверка наличия ошибки
  if (hasError) {
    // Деструктуризация объекта ошибки для получения заголовка, текста и изображения
    const { title, text, image } = error;
    // Вывод сообщения об ошибке при неудаче соединения
    return <Alert title={title} text={text} image={image} />;
  }

  // Возврат дочерних компонентов в случае успешной загрузки данных без ошибок
  return children;
}

// Определение PropTypes для компонента
RenderContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
  }),
  children: PropTypes.node,
};
