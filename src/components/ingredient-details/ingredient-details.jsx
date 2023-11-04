import React from 'react';
import PropTypes from 'prop-types';
import EnergyItem from './energy-item/energy-item';
import styles from './ingredient-details.module.css';

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

function isImageUrl(url) {
  return /^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(url);
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: (props, propName, componentName) => {
      if (!isImageUrl(props[propName])) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expecting a valid image URL.`);
      }
    },
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
};
