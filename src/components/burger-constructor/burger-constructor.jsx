import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

import { TEST_LIST } from '../../utils/data.js';

import PriceBox from './price-box/price-box';
import Burger from './burger/burger';

export default function BurgerConstructor({ onOrderClick }) {
  return (
    <section className={`${styles.constructor} pt-10`}>
      <Burger data={TEST_LIST} />
      <PriceBox onOrderClick={onOrderClick} />
    </section>
  );
}

PriceBox.propTypes = {
  onOrderClick: PropTypes.func.isRequired,
};
