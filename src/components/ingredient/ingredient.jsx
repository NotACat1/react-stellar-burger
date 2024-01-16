import React, { useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// Подключение компонентов
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, addBun } from '../../services/actions/burger';
//import { openSelectedIngredient } from '../../../../services/actions/ingredient-details';

// Подключение Drag and Drop
import { useDrag, DragPreviewImage } from 'react-dnd';

// Подключение стилей и данных
import styles from './ingredient.module.css';
import isEmpty from '../../utils/isEmpty';
import dragIcon from '../../assets/images/drag-icon.png';
import leftClickIcon from '../../assets/images/left-сlick-icon.png';
import rightClickIcon from '../../assets/images/right-сlick-icon.png';

// Импорт пользовательских PropTypes
import { ingredientPropType } from '../../utils/prop-types';
import shallowEqual from '../../utils/shallowEqual';

// Компонент для отображения ингредиента
export default function Ingredient({ data }) {
  // Получение текущего пути и функции навигации из react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Получение функции dispatch из react-redux
  const dispatch = useDispatch();

  // Получение данных о булке и ингредиентах из Redux-стейта
  const { bun: burgerBun, ingredients: burgerIngredients } = useSelector((state) => state.burgerData, shallowEqual);

  // Получение объекта для работы с параметрами запроса из react-router-dom
  const [searchParams, setSearchParams] = useSearchParams();

  // Обработчик клика на ингредиенте
  const handleClick = useCallback(() => {
    const state = { background: location };
    navigate(`/ingredients/${data._id}`, { state });
  }, [navigate, location, data]);

  // Функция обновления параметров запроса
  const updateSearchParams = useCallback(() => {
    if (data.type === 'bun') {
      if (burgerBun._id !== data._id) {
        dispatch(addBun(data));
      }
      searchParams.set('bun', data._id);
    } else {
      dispatch(addIngredient(data));
      const updatedIngredients = [...burgerIngredients, data];
      const idsIngredientsString = updatedIngredients.map((ingredient) => ingredient._id).join(',');
      searchParams.set('ingredients', idsIngredientsString);
    }

    setSearchParams(searchParams.toString());
  }, [dispatch, data, searchParams, burgerIngredients, burgerBun]);

  // Обработчик контекстного меню
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      updateSearchParams();
    },
    [updateSearchParams],
  );

  // Обработчик нажатия клавиши Enter
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        updateSearchParams();
      }
    },
    [updateSearchParams],
  );

  // Подсчет количества ингредиента
  const countIngredient = useMemo(
    () =>
      data.type === 'bun'
        ? data._id === burgerBun._id
          ? 2
          : 0
        : burgerIngredients.reduce((col, ingredient) => (ingredient._id === data._id ? col + 1 : col), 0),
    [data, burgerIngredients, burgerBun],
  );

  // Использование библиотеки react-dnd для поддержки перетаскивания
  const [{ isDrag }, drag, preview] = useDrag({
    type: 'choose-ingredient',
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // Определение, может ли ингредиент быть перетащен
  const isDraggable = data.type === 'bun' ? true : !isEmpty(burgerBun);

  // Визуальное отображение компонента
  return (
    <>
      {isDraggable && <DragPreviewImage connect={preview} src={data.image_mobile} />}
      <li
        onClick={isDraggable ? handleClick : undefined}
        onContextMenu={isDraggable ? handleContextMenu : undefined}
        onKeyPress={isDraggable ? handleKeyPress : undefined}
        className={`${styles.ingredient} ${isDraggable ? styles.ingredient_draggable : ''}`}
        ref={isDraggable ? drag : undefined}
        style={{ opacity: isDrag ? 0.5 : 1 }}
      >
        {isDraggable && (
          <div className={styles.icons}>
            <img className={styles.icon} src={dragIcon} alt="Перетаскивание" />
            <img className={styles.icon} src={leftClickIcon} alt="Левый клик мыши" />
            <img className={styles.icon} src={rightClickIcon} alt="Правый клик мыши" />
          </div>
        )}
        {countIngredient !== 0 && <Counter count={countIngredient} size="default" />}
        <img
          className={`${styles.image} ${!isDraggable ? styles.image_draggable : ''} pl-4 pr-4`}
          src={data.image}
          alt={data.name}
        />
        <p className={`${styles.price} text text_type_digits-default`}>
          <span>{data.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.description} text text_type_main-default`}>{data.name}</p>
      </li>
    </>
  );
}

// Определение PropTypes для компонента
Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};
