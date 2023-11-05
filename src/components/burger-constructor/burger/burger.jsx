import React from 'react';
import styles from './burger.module.css';
import { EMPTY_BUN } from '../../../utils/data.js';
import { ingredientPropType } from '../../../utils/prop-types.js';

import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';

export default function Burger({ data }) {
  return (
    <ul className={`${styles.list} pt-5 pb-5 pl-4 mb-5`}>
      <Ingredient position="top" iconVis={false} data={EMPTY_BUN} />
      <ul className={`${styles.seclist} pr-2`}>
        {data && data.map((item) => <Ingredient iconVis={true} data={item} key={item._id} />)}
      </ul>
      <Ingredient position="bottom" iconVis={false} data={EMPTY_BUN} />
    </ul>
  );
}

Burger.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
};
