import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './price-item.module.css';

export default function PriceItem({ position, iconVis, item }) {
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
        text={item.name + (position === 'top' ? ' (верх)' : '') + (position === 'bottom' ? ' (низ)' : '')}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
}

function isImageUrl(url) {
  return /^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(url);
}

PriceItem.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom', undefined]).isRequired,
  iconVis: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: (props, propName, componentName) => {
      if (!isImageUrl(props[propName])) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expecting a valid image URL.`);
      }
    },
  }).isRequired,
};
