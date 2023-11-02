import React from 'react';
import styles from './burger-constructor.module.css';

import PriceBox from './price-box/price-box';
import BurgerList from './price-list/price-list';

function BurgerConstructor() {
  return (
    <section className={`${styles.constructor} pt-10`}>
      <BurgerList />
      <PriceBox />
    </section>
  );
}

export default BurgerConstructor;
