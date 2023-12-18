import React, { useState, useEffect } from 'react';

// Подключение компонентов
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeSelectedIngredient } from '../../services/actions/ingredient-details';
import { closeOrderModal } from '../../services/actions/order-details';

// Подключение стилей
import styles from './app.module.css';

// Основной компонент приложения
export default function App() {
  // Получение диспетчера Redux и состояние открыия модального окна инридиентов
  const dispatch = useDispatch();
  // Получение состояния открытия модального окна выбранного ингредиента
  const openModalIngredient = useSelector((state) => state.selectedIngredient.open);
  // Деструктуризация состояния созданного заказа для модального окна заказа
  const {
    loading: loadingModalOrder, // Флаг загрузки данных заказа
    error: errorModalOrder, // Ошибка, если есть
    open: openModalOrder, // Флаг открытого состояния модального окна заказа
  } = useSelector((state) => state.createdOrder);

  // Функция для закрытия модального окна
  const closeModal = () => {
    if (openModalIngredient) dispatch(closeSelectedIngredient());
    if (errorModalOrder === null && !loadingModalOrder && openModalOrder) dispatch(closeOrderModal());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pr-5 pl-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      {openModalIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
      {errorModalOrder === null && !loadingModalOrder && openModalOrder && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
