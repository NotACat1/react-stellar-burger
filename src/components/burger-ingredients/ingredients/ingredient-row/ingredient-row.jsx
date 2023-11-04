import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-row.module.css';

import Ingredient from '../ingredient/ingredient';

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

function isImageUrl(url) {
  return /^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(url);
}

IngredientsRow.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: (props, propName, componentName) => {
        if (!isImageUrl(props[propName])) {
          return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expecting a valid image URL.`);
        }
      },
    }),
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
