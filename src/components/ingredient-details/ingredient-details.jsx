import React from 'react';
import PropTypes from 'prop-types';
import EnergyItem from './energy-item/energy-item';
import styles from './ingredient-details.module.css';
import { ingredientPropType } from '../../utils/prop-types.js';

export default function IngredientDetails({ data }) {
  return (
    <div className={styles.info}>
      <img className={`${styles.img} pl-5 pr-5 mb-4`} src={data.image} alt={data.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{data.name}</p>
      <ul className={`${styles.list} mt-8`}>
        <EnergyItem title="Калории,ккал" value={data.calories} />
        <EnergyItem title="Белки, г" value={data.proteins} />
        <EnergyItem title="Жиры, г" value={data.fat} />
        <EnergyItem title="Углеводы, г" value={data.carbohydrates} />
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: ingredientPropType
};
