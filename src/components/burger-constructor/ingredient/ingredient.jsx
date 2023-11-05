import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { ingredientPropType } from '../../../utils/prop-types.js';

export default function Ingredient({ position, iconVis, data }) {
  const visibility = iconVis ? styles.icon_visible : styles.icon_hidden;
  return (
    <li className={styles.burger}>
      <div className={visibility}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        className={styles.element}
        type={position}
        isLocked={position !== undefined}
        text={data.name + (position === 'top' ? ' (верх)' : '') + (position === 'bottom' ? ' (низ)' : '')}
        price={data.price}
        thumbnail={data.image}
      />
    </li>
  );
}

Ingredient.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
  iconVis: PropTypes.bool.isRequired,
  data: ingredientPropType,
};
