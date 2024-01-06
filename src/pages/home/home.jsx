import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Подключение компонентов
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { addBun, addIngredient, setOrderState } from '../../services/actions/burger';

// react-dnd - библиотека для реализации перетаскивания и бросания (DnD)
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

// Подключение стилей и данных
import styles from './home.module.css';

export default function HomePage() {
  // Получение диспетчера Redux и активной вкладки и ссылок на элементы
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredientsData.ingredients);
  const isOrder = useSelector((state) => state.burgerData.isOrder);

  // Импорт хука для работы с параметрами строки запроса
  const [searchParams, setSearchParams] = useSearchParams();
  // Извлечение значения параметра 'bun' из строки запроса URL
  const bunBurgerId = searchParams.get('bun');
  // Извлечение значения параметра 'bun' из строки запроса URL
  const bunIngredientsIds = searchParams.get('ingredients');

  // Эффект для установки активной вкладки из URL при монтировании компонента
  useEffect(() => {
    if (isOrder) {
      setSearchParams({ bun: null, ingredients: null });
      dispatch(setOrderState(false));
    } else {
      if (bunBurgerId) {
        const dataBun = ingredients.find((ingredient) => ingredient._id === bunBurgerId);
        if (dataBun) dispatch(addBun(dataBun));
      }
      if (bunIngredientsIds) {
        bunIngredientsIds.split(',').forEach((id) => {
          const dataIngredient = ingredients.find((ingredient) => ingredient._id === id);
          if (dataIngredient) dispatch(addIngredient(dataIngredient));
        });
      }
    }
  }, [dispatch, ingredients]);

  return (
    <div className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}
