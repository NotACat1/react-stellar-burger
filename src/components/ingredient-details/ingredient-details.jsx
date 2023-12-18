import React, { useMemo } from 'react';

// Подключение компонентов
import EnergyItem from './energy-item/energy-item';

// Подключение Redux
import { useSelector } from 'react-redux';

// Подключение стилей
import styles from './ingredient-details.module.css';

// Основной компонент для информации об ингридиенте
export default function IngredientDetails() {
  // Получение данных об ингредиенте из Redux
  const { name, image, energy } = useSelector((state) => state.selectedIngredient.ingredient);

  // Проверка существования данных ингредиента
  const energyItems = useMemo(() => {
    return energy.map(({ name, value }, index) => <EnergyItem key={index} title={name} value={value} />);
  }, [energy]);

  return (
    <div className={styles.info}>
      <img className={`${styles.img} pl-5 pr-5 mb-4`} src={image} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
      <ul className={`${styles.list} mt-8`}>{energyItems}</ul>
    </div>
  );
}
