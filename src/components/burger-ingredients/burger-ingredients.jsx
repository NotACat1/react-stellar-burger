import React, { useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

import Tabs from './tabs/tabs';
import Ingredients from './ingredients/ingredients';

export default function BurgerIngredients({ onCardClick }) {
  const [state, setState] = useState({
    dataIngredients: null,
    loading: false,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...state, loading: true });
      try {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const rez = await response.json();
        setState({ dataIngredients: rez.data, loading: false, error: !rez.success });
      } catch (error) {
        console.error('ERROR:', error);
        setState({ dataIngredients: null, loading: false, error: true });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!state.error && !state.loading && (
        <section className={styles.ingredients}>
          <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
          <Tabs />
          <Ingredients onCardClick={onCardClick} data={state.dataIngredients} />
        </section>
      )}
    </>
  );
}

BurgerIngredients.propTypes = {
  onCardClick: PropTypes.func.isRequired,
};
