import React, { useCallback, useMemo } from 'react';

// Подключение компонентов
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { openSelectedIngredient } from '../../../../services/actions/ingredient-details';

// Подключение Drag and Drop
import { useDrag, DragPreviewImage } from 'react-dnd';

// Подключение стилей и данных
import styles from './ingredient.module.css';

// Импорт пользовательских PropTypes
import { ingredientPropType } from '../../../../utils/prop-types.js';

// Компонент для отображения ингредиента
export default function Ingredient({ data }) {
  // Извлекаем необходимые данные из объекта ингредиента
  const { _id: id, image, image_mobile, name, price } = data;

  // Получение диспетчера Redux и булочки и ингридиентов для бургера
  const dispatch = useDispatch();
  const { bun: burgerBun, ingredients: burgerIngredients } = useSelector((state) => state.burgerIngredients);

  // Обработчик клика для выбора ингредиента
  const handleClick = useCallback(() => {
    dispatch(openSelectedIngredient(data));
  }, [dispatch, data]);

  // Обработчик нажатия клавиши Enter для выбора ингредиента
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        dispatch(openSelectedIngredient(data));
      }
    },
    [dispatch, data],
  );

  // Вычисление количества ингредиента в бургере с использованием useMemo
  const count = useMemo(() => {
    if (data.type === 'bun') {
      return data._id === burgerBun._id ? 2 : 0;
    } else {
      return burgerIngredients.reduce((col, ingredient) => (ingredient._id === id ? col + 1 : col), 0);
    }
  }, [data, burgerBun, burgerIngredients]);

  // Использование библиотеки для реализации Drag and Drop
  const [{ isDrag }, drag, preview] = useDrag({
    type: 'ingredient',
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={image_mobile} />
      <li
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        className={styles.ingredient}
        ref={drag}
        style={{ opacity: isDrag ? 0.5 : 1 }}
      >
        <Counter count={count} size="default" extraClass="m-1" />
        <img className={`${styles.images} pl-4 pr-4 mb-2`} src={image} alt={name} />
        <div className={`mt-2 mb-2 ${styles.price}`}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`mt-2 ${styles.description} text text_type_main-default`}>{name}</p>
      </li>
    </>
  );
}

Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};
