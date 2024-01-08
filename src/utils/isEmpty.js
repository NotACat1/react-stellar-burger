// Экспорт функции по умолчанию
export default function isEmpty(value) {
  // Проверка типа значения
  switch (typeof value) {
    case 'object':
      // Если тип значения - объект
      return value === null ? true : Object.keys(value).length === 0; // Вернуть true, если объект пуст, иначе false
    case 'array':
      // Если тип значения - массив
      return value.length === 0; // Вернуть true, если массив пуст, иначе false
    default:
      // Для остальных типов значений
      return !value; // Вернуть true, если значение ложно (пусто), иначе false
  }
}
