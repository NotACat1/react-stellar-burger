import React from 'react';
import styles from './price-list.module.css';
import { EMPTY_BUN } from '../../../utils/data.js';

import BurgerItem from '../price-item/price-item';

function BurgerList(selectedItems) {	
  return (
    <ul className={`${styles.list} pt-5 pb-5 pl-4 mb-5`}>
			<BurgerItem position='top' iconVis={false} item={EMPTY_BUN} />
			<ul className={`${styles.secondaryList} pr-2`}>
				{selectedItems.length > 0 && selectedItems.map((item) => (
					<BurgerItem iconVis={true} item={item} key={item._id} />
				))}				
			</ul>			
			<BurgerItem position='bottom' iconVis={false} item={EMPTY_BUN} />
		</ul>
  );
}

export default BurgerList;