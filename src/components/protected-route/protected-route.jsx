import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// Подключение компонентов
import Loader from '../loader/loader';

// Подключение стилей и данных
import isEmpty from '../../utils/isEmpty';
import shallowEqual from '../../utils/shallowEqual';
import { MAIN_PATHS } from '../../utils/constants';

const Protected = ({ onlyUnAuth = false, element }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const { information: userInfo, isRequestingGetUserData: isAuthChecked } = useSelector(
    (store) => store.userData,
    shallowEqual,
  );
  const location = useLocation();

  if (isAuthChecked) {
    // Запрос еще выполняется
    return <Loader />;
  }

  const isEmptyUserInfo = isEmpty(userInfo);

  if (onlyUnAuth && !isEmptyUserInfo) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: MAIN_PATHS.home } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && isEmptyUserInfo) {
    return <Navigate to={MAIN_PATHS.login} state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return element;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ element }) => <Protected onlyUnAuth={true} element={element} />;
