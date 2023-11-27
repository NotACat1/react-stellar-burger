import React from 'react';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price-box.module.css';

export default function PriceBox({ onOrderClick }) {
  return (
    <div className={`${styles.container} mt-5 pr-4`}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium">100</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" htmlType="button" onClick={onOrderClick}>
        Оформить заказ
      </Button>
    </div>
  );
}

PriceBox.propTypes = {
  onOrderClick: PropTypes.func.isRequired,
};
