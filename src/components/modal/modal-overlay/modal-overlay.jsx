import React from 'react';
import PropTypes from 'prop-types';

// Подключение стилей и данных
import styles from './modal-overlay.module.css';

// Компонент оверлея модального окна
export default function ModalOverlay({ onClose }) {
  return <div className={styles.overlay} onClick={onClose}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
