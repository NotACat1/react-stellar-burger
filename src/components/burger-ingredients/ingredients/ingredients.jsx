import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients.module.css';

import { COMPONENT_TABS } from '../../../utils/data.js';
import { ingredientPropType } from '../../../utils/prop-types.js';

import IngredientsRow from './ingredient-row/ingredient-row';

export default function Ingredients({ data, onCardClick }) {
  return (
    <ul className={`${styles.container} mt-10 pr-2 pl-4`}>
      {COMPONENT_TABS.map((tabItem) => (
        <IngredientsRow
          onCardClick={onCardClick}
          key={tabItem.type}
          title={tabItem.text}
          data={data ? data.filter((ingredient) => ingredient.type === tabItem.type) : []}
        />
      ))}
    </ul>
  );
}

Ingredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  onCardClick: PropTypes.func.isRequired,
};
