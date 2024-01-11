import React, { useMemo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// Подключение Redux
import { useDispatch } from 'react-redux';
import { logout } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './profile.module.css';

export default function ProfilePage() {
  const dispatch = useDispatch(); // Хук для вызова действий Redux

  const [currentPage, setCurrentPage] = useState('home');

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

  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Основной JSX компонента
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <NavLink onClick={() => changePage('home')} className={getLinkStyle} to="" end>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => changePage('orders')} className={getLinkStyle} to="orders" end>
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className={getLinkStyle} to="login" end>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          {currentPage === 'home' && 'В этом разделе вы можете изменить свои персональные данные'}
          {currentPage === 'orders' && 'В этом разделе вы можете просмотреть свою историю заказов'}
        </p>
      </nav>
      <Outlet />
    </div>
  );
}
