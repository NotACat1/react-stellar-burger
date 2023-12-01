import React, { useMemo } from 'react';

// Подключение компонентов
import Ingredient from '../ingredient/ingredient';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { addBunBurger, addIngredientBurger } from '../../../services/actions/burger-constructor';

// Подключение Drag and Drop
import { useDrop } from 'react-dnd';

// Подключение стилей и данных
import styles from './burger.module.css';

// Компонент для игридиентов бургера
export default function Burger() {
  // Получение диспетчера Redux и данных о булочке и ингредиентах из Redux-стейта
  const dispatch = useDispatch();
  const { bun: burgerBun, ingredients: burgerIngredients } = useSelector((state) => state.burgerIngredients);

  // Использование useMemo для оптимизации рендера
  const renderedIngredients = useMemo(() => {
    if (burgerIngredients) {
      return burgerIngredients.map((ingredient) => (
        <Ingredient iconVis={true} data={ingredient} key={ingredient.key} />
      ));
    }
    return null;
  }, [burgerIngredients]);

  // Использование useDrop для обработки бросания ингредиентов
  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      item && item.type === 'bun' ? dispatch(addBunBurger(item)) : dispatch(addIngredientBurger(item));
    },
  });

  return (
    <ul ref={drop} style={{ opacity: isHover ? 0.5 : 1 }} className={`${styles.list} pt-5 pb-5 pl-4 mb-5`}>
      <Ingredient position="top" iconVis={false} data={burgerBun} />
      <ul className={`${styles.seclist} pr-2`}>{renderedIngredients}</ul>
      <Ingredient position="bottom" iconVis={false} data={burgerBun} />
    </ul>
  );
}
