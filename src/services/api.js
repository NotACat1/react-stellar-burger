// Функция для отправки GET-запроса на сервер для получения списка ингредиентов
export const getFetchIngredientsRequest = async () => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
    if (!response.ok) {
      throw new Error('Ошибка при получении ингредиентов');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении ингредиентов:', error);
    throw error;
  }
};

// Функция для отправки POST-запроса на сервер с указанными ингредиентами для создания заказа
export const postFetchBurgerRequest = async (ingredients) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
      }),
    });
    if (!response.ok) {
      throw new Error('Ошибка при получении ингредиентов');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении ингредиентов:', error);
    throw error;
  }
};
