import React from 'react';
import { Navigate } from 'react-router-dom';

// Подключение Redux
import { useSelector } from 'react-redux';
import isEmpty from '../../utils/isEmpty';

// Компонент, отображающий указанный элемент только в случае, если пользователь не аутентифицирован. 
// Если пользователь аутентифицирован, происходит перенаправление на указанный путь.
export default function OnlyUnauth({ element, path }) {
  // Получение информации о пользователе из состояния Redux
  const userInfo = useSelector((state) => state.userData.information);

  // Отображение указанного элемента, если пользователь не аутентифицирован, в противном случае перенаправление на указанный путь
  return !isEmpty(userInfo) ? <Navigate to={path} replace /> : element;
}
