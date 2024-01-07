import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Подключение Redux
import { useSelector } from 'react-redux';
import isEmpty from '../../utils/isEmpty';

// Компонент OnlyAuth проверяет наличие информации о пользователе в хранилище Redux.
// Если информация о пользователе присутствует, возвращает переданный элемент,
// в противном случае перенаправляет на страницу входа.
export default function OnlyAuth({ element }) {
  // Получаем информацию о пользователе из хранилища Redux.
  const userInfo = useSelector((state) => state.userData.information);

  // Проверяем, есть ли информация о пользователе.
  // Если есть, возвращаем переданный элемент, иначе выполняем перенаправление на страницу входа.
  return !isEmpty(userInfo) ? element : <Navigate to="/login" replace />;
}

// Определение PropTypes для компонента
OnlyAuth.propTypes = {
  element: PropTypes.element.isRequired,
};