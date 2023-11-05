import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-row.module.css';

import Ingredient from '../ingredient/ingredient';
import { ingredientPropType } from '../../../../utils/prop-types.js';

export default function IngredientsRow({ title, data, onCardClick }) {
  return (
    <li className={styles.row}>
      <h3 className={'mb-6 text text_type_main-medium'}>{title}</h3>
      <ul className={`${styles.list} mt-6`}>
        {data.map((ingredient) => (
          <Ingredient onCardClick={onCardClick} key={ingredient._id} data={ingredient} />
        ))}
      </ul>
    </li>
  );
}

IngredientsRow.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
