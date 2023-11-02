import React from 'react';
import styles from './ingredient-row.module.css';

import Ingredient from '../ingredient/ingredient';

function IngredientsRow({ title, children }) {
  return (
    <li className={styles.row}>
			<h3 className={`mb-6 text text_type_main-medium`}>{title}</h3>
			<ul className={`${styles.list} mt-6`}>
				{children.map((ingredient) => (				
					<Ingredient key={ingredient._id}>
						{ingredient}
					</Ingredient>
				))}
			</ul>			
		</li>
  );
}

export default IngredientsRow;