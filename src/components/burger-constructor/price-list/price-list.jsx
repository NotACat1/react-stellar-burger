import React from 'react';
import styles from './price-list.module.css';
import { EMPTY_BUN } from '../../../utils/data.js';

import PriceItem from '../price-item/price-item';
import PropTypes from 'prop-types';

export default function PriceList({ data }) {
  return (
    <ul className={`${styles.list} pt-5 pb-5 pl-4 mb-5`}>
      <PriceItem position="top" iconVis={false} item={EMPTY_BUN} />
      <ul className={`${styles.seclist} pr-2`}>
        {data && data.map((item) => <PriceItem iconVis={true} item={item} key={item._id} />)}
      </ul>
      <PriceItem position="bottom" iconVis={false} item={EMPTY_BUN} />
    </ul>
  );
}

PriceList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ),
};
