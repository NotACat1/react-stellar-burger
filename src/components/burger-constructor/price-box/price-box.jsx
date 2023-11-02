import React from 'react';
import styles from './price-box.module.css';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function PriceBox() {	
  return (
    <div className={`${styles.container} mt-5 pr-4`}>
			<div className={styles.price}>
        <p className="text text_type_digits-medium">100</p>
        <CurrencyIcon type="primary" />
      </div>
			<Button
        type="primary"
        size="large"
        htmlType="button"
      >
        Оформить заказ
      </Button>
		</div>
  );
}

export default PriceBox;