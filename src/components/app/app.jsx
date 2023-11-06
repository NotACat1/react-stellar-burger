import React, { useState } from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

export default function App() {
  const [modalIngredientState, setModalIngredientState] = useState({
    open: false,
    data: null,
  });

  const [modalOrderState, setModalOrderState] = useState({
    open: false,
  });

  const handleIngredientClick = (data) => {
    setModalIngredientState({ open: true, data: data });
  };

  const handleOrderClick = () => {
    setModalOrderState({ open: true });
  };

  const closeModal = () => {
    setModalIngredientState({ ...modalIngredientState, open: false });
    setModalOrderState({ ...modalOrderState, open: false });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pr-5 pl-5`}>
        <BurgerIngredients onCardClick={handleIngredientClick} />
        <BurgerConstructor onOrderClick={handleOrderClick} />
      </main>
      {modalIngredientState.open && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails data={modalIngredientState.data} />
        </Modal>
      )}
      {modalOrderState.open && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
