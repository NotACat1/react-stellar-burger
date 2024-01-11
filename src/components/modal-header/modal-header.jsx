import React from 'react';
import PropTypes from 'prop-types';

// Подключение компонентов
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение стилей
import styles from './modal-header.module.css';

// Компонент шапки модального окна
export default function ModalHeader({ title, close }) {
  return (
    <div className={styles.header}>
      {title && <p className={`${styles.title} text text_type_main-large`}>{title}</p>}
      <div className={styles.button}>
        <CloseIcon type="primary" onClick={close} />
      </div>
    </div>
  );
}

// Определение PropTypes для компонента
ModalHeader.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func.isRequired,
};
