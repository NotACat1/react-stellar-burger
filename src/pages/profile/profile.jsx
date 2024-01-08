import React, { useEffect, useMemo } from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';

// Подключение компонентов
import FeedUser from '../../components/feed-user/feed-user';
import ProfileForm from '../../components/profile-form/profile-form';
import FeedDetails from '../../components/feed-details/feed-details';
import FeedStatus from '../../components/feed-status/feed-status';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './profile.module.css';
import { MAIN_PATHS, PROFILE_PATHS } from '../../utils/constants';

export default function ProfilePage() {
  const location = useLocation(); // Хук для получения текущего URL
  const dispatch = useDispatch(); // Хук для вызова действий Redux
  const token = useSelector((state) => state.userData.accessToken); // Получение токена из состояния Redux

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    dispatch(logout(token));
  };

  // Функция для установки стилей активной ссылки
  const setLinkStyle = (link) => {
    const defaultStyle = `${styles.link} text text_type_main-medium`;
    return `${defaultStyle} ${location.pathname !== link ? 'text_color_inactive' : 'text_color_primary'}`;
  };

  // Текстовое описание раздела в зависимости от текущего URL
  const textProfile = useMemo(() => {
    switch (location.pathname) {
      case MAIN_PATHS.profile:
        return 'В этом разделе вы можете изменить свои персональные данные';
      case `${MAIN_PATHS.profile}/${PROFILE_PATHS.orders}`:
        return 'В этом разделе вы можете просмотреть свою историю заказов';
      default:
        return '';
    }
  }, [location.pathname]);

  // Массив объектов с маршрутами и соответствующими компонентами
  const routes = [
    { path: PROFILE_PATHS.profileForm, element: <ProfileForm /> },
    { path: PROFILE_PATHS.orders, element: <FeedUser /> },
    { path: PROFILE_PATHS.orderDetails, element: <FeedDetails /> },
    { path: PROFILE_PATHS.orderStatus, element: <FeedStatus /> },
  ];

  // Основной JSX компонента
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <NavLink className={setLinkStyle(MAIN_PATHS.profile)} to={PROFILE_PATHS.profileForm}>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              className={setLinkStyle(`${MAIN_PATHS.profile}/${PROFILE_PATHS.orders}`)}
              to={PROFILE_PATHS.orders}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className={setLinkStyle(MAIN_PATHS.login)} to={MAIN_PATHS.login}>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{textProfile}</p>
      </nav>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}
