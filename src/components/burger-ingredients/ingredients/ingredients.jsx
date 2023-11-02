import React from 'react';
import styles from './ingredients.module.css';

import { data as ingredientData, COMPONENT_TABS } from '../../../utils/data.js';

import IngredientsRow from './ingredient-row/ingredient-row';

function Ingredients() {
  return (
    <ul className={`${styles.container} mt-10 pr-2 pl-4`}>
      {COMPONENT_TABS.map((tabItem) => (
        <IngredientsRow key={tabItem.type} title={tabItem.text}>
          {ingredientData.filter((ingredient) => ingredient.type === tabItem.type)}
        </IngredientsRow>
      ))}
    </ul>
  );
}

export default Ingredients;
