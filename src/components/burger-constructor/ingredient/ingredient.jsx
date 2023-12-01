import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Подключение компонентов
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch } from 'react-redux';
import { removeIngredientBurger, updateIngredientOrder } from '../../../services/actions/burger-constructor';

// Подключение Drag and Drop
import { useDrag, useDrop } from 'react-dnd';

// Подключение стилей
import styles from './ingredient.module.css';

// Импорт пользовательских PropTypes
import { ingredientPropType } from '../../../utils/prop-types.js';

// Компонент ингридиента бургера
export default function Ingredient({ position, iconVis, data }) {
  // Получение диспетчера Redux
  const dispatch = useDispatch();

  // Иконка для перетаскивания ингридиентов
  const visibility = iconVis ? styles.icon_visible : styles.icon_hidden;

  // Функция для обработки удаления ингредиента
  const handleIngredientDelete = () => {
    dispatch(removeIngredientBurger(data.key));
  };

  // Хук для перетаскивания
  const [{ isDrag }, drag] = useDrag({
    type: 'item',
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // Хук для обработки бросания
  const [, drop] = useDrop({
    accept: 'item',
    hover: (item) => {
      const { key: firstKey } = item;
      const secondKey = data.key;
      if (firstKey && secondKey && firstKey !== secondKey) {
        dispatch(updateIngredientOrder(firstKey, secondKey));
      }
    }
  });

  // Создаем общий реф
  const sharedRef = useRef();
  // Привязываем общий реф к обоим хукам
  if (iconVis) {
    drag(sharedRef);
    drop(sharedRef);
  }

  return (
    <li className={styles.burger} ref={sharedRef} style={{ opacity: isDrag ? 0.5 : 1 }}>
      <div className={visibility} ref={iconVis ? drag : null}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        handleClose={handleIngredientDelete}
        className={styles.element}
        type={position}
        isLocked={position !== undefined}
        text={data.name + (position === 'top' ? ' (верх)' : '') + (position === 'bottom' ? ' (низ)' : '')}
        price={data.price}
        thumbnail={data.image}
      />
    </li>
  );
}

Ingredient.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
  iconVis: PropTypes.bool.isRequired,
  data: ingredientPropType,
};
