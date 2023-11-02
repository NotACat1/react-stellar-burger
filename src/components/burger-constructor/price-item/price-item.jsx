import React from 'react';
import styles from './price-item.module.css';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({ position, iconVis, item }) {	
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
        text={
          item.name +
          (position === "top" ? " (верх)" : "") +
          (position === "bottom" ? " (низ)" : "")
        }
        price={item.price}
				thumbnail={item.image}      
      />
    </li>
  );
}

export default BurgerConstructor;