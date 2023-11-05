import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById('portal-root');

export default function Modal({ children, title, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 'Escape') {
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
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
