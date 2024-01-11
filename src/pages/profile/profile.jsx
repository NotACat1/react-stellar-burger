import React, { useMemo } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';

// Подключение Redux
import { useDispatch} from 'react-redux';
import { logout } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './profile.module.css';
import { MAIN_PATHS, PROFILE_PATHS } from '../../utils/constants';

export default function ProfilePage() {
  const location = useLocation(); // Хук для получения текущего URL
  const dispatch = useDispatch(); // Хук для вызова действий Redux

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    dispatch(logout());
  };

  // Мемоизация функции для определения стиля ссылки
  const getLinkStyle = useMemo(
    () =>
      ({ isActive }) => {
        const defaultStyle = `${styles.link} text text_type_main-medium`;
        return `${defaultStyle} ${isActive ? 'text_color_primary' : 'text_color_inactive'}`;
      },
    [],
  );

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

  // Основной JSX компонента
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <NavLink className={getLinkStyle} to="" end>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkStyle} to={PROFILE_PATHS.orders} end>
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className={getLinkStyle} to={MAIN_PATHS.login} end>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{textProfile}</p>
      </nav>
      <Outlet />
    </div>
  );
}
