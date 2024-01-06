import { useState } from 'react';

// Создаем кастомный хук для управления формой
export default function useForm(inputValues) {
  // Инициализация состояния с начальными значениями формы
  const [values, setValues] = useState(inputValues);

  // Обработчик изменения значений полей формы
  const handleChange = (evt) => {
    // Извлекаем имя и значение из события изменения
    const { name, value } = evt.target;
    // Обновляем состояние, сохраняя предыдущие значения и добавляя новое значение
    setValues({ ...values, [name]: value });
  };

  // Возвращаем объект с текущими значениями формы, обработчиком изменения и функцией установки значений
  return { values, handleChange, setValues };
}
