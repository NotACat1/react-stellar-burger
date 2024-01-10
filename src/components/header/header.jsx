import React, { useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// Подключение компонентов
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector } from 'react-redux';

// Подключение стилей
import styles from './header.module.css';
import shallowEqual from '../../utils/shallowEqual';
import { MAIN_PATHS } from '../../utils/constants';

export default function Header() {
  // Получение текущего местоположения
  const currentLocation = useLocation();

  // Получение информации о пользователе из Redux
  const userInformation = useSelector((store) => store.userData.information, shallowEqual);

  // Функция для определения типа иконки на основе текущего местоположения
  const getIconType = (url) => (currentLocation.pathname === url ? 'primary' : 'secondary');

  // Мемоизация функции для определения стиля ссылки
  const getLinkStyle = useMemo(
    () =>
      ({ isActive }) => {
        const defaultStyle = `${styles.link} text_color_inactive pt-4 pb-4 pr-5 pl-5`;
        return `${defaultStyle} ${isActive ? styles.link_active : ''}`;
      },
    [],
  );

  // Конфигурации каждой ссылки
  const linkConfigurations = [
    { to: MAIN_PATHS.home, label: 'Конструктор', icon: <BurgerIcon type={getIconType(MAIN_PATHS.home)} /> },
    { to: MAIN_PATHS.feed, label: 'Лента заказов', icon: <ListIcon type={getIconType(MAIN_PATHS.feed)} /> },
  ];

  // Конфигурации ссылки в личный кабинет
  const linkConfigurationProfile = {
    to: MAIN_PATHS.profile,
    label: userInformation.name ? userInformation.name : 'Личный кабинет',
    icon: <ProfileIcon type={getIconType(MAIN_PATHS.profile)} />,
  };

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {linkConfigurations.map(({ to, label, icon }, index) => (
            <li key={index}>
              {/* Использование NavLink для навигации с активным состоянием */}
              <NavLink className={getLinkStyle} to={to}>
                {icon}
                <span className="text text_type_main-default">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Использование обычной ссылки для логотипа */}
        <Link to={MAIN_PATHS.home} className={styles.logo}>
          <Logo />
        </Link>
        {/* Использование NavLink для навигации в кабинет пользователя */}
        <NavLink className={getLinkStyle} to={linkConfigurationProfile.to}>
          {linkConfigurationProfile.icon}
          <span className="text text_type_main-default">{linkConfigurationProfile.label}</span>
        </NavLink>
      </nav>
    </header>
  );
}
