import React from 'react';
import { Logo, CurrencyIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <a
              className={`${styles.link} ${styles.link_active} pt-4 pb-4 pr-5 pl-5 text text_type_main-default`}
              href="#"
            >
              <CurrencyIcon type="primary" />
              <span className={styles.linkText}>Конструктор</span>
            </a>
          </li>
          <li>
            <a className={`${styles.link} pt-4 pb-4 pr-5 pl-5 text text_type_main-default`} href="#">
              <ListIcon type="secondary" />
              <span>Конструктор</span>
            </a>
          </li>
        </ul>
        <a className={styles.logo} href="#">
          <Logo />
        </a>
        <a className={`${styles.link} pt-4 pb-4 pr-5 pl-5 text text_type_main-default`} href="#">
          <ProfileIcon type="secondary" />
          <span>Конструктор</span>
        </a>
      </nav>
    </header>
  );
}
