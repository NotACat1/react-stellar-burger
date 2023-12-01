import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Подключение компонентов
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';

// Подключение стилей и данных
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('portal-root');

// Компонент модального окна
export default function Modal({ children, title, onClose }) {
  // Обработка события нажатия на клавишу "Escape" для закрытия модального окна
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} p-10`}>
        <ModalHeader close={onClose} title={title} />
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot,
  );
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
