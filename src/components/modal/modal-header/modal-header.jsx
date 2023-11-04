import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.css';

export default function ModalHeader({ title, close }) {
  return (
    <div className={styles.header}>
      {title && <p className={`${styles.title} text text_type_main-large`}>{title}</p>}
      <CloseIcon className={styles.btn} type="primary" onClick={close} />
    </div>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func.isRequired,
};