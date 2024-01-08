// Базовый URL для API
export const BASE_URL = 'https://norma.nomoreparties.space/api';

// URL для получения всех заказов через WebSocket
export const ALL_ORDERS_URL = 'wss:/norma.nomoreparties.space/orders/all';

// URL для получения заказов пользователя через WebSocket
export const USER_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

// Коды ошибок
export const TOKEN_EXPIRED_ERROR = 403;
export const UNAUTHORIZED_ERROR = 401;

// Константы, представляющие различные типы ингредиентов для вкладок
export const COMPONENT_TABS = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

// Константа, представляющая смещение вкладок
export const TAB_OFFSET = 10;

// Константа, представляющая порог высоты строки
export const ROW_HEIGHT_THRESHOLD = 30;

// Константа для установки стандартного срока годности
export const DEFAULT_EXPIRATION_DAYS = 7;

// Стандартные данные об ингредиенте, используемые при отсутствии информации
export const DEFAULT_INFO_INGREDIENT = {
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  image: 'https://... (ссылка на изображение)',
  name: 'Информация об ингридиенте не найдена :(',
};

// Статусы заказов
export const ORDER_STATUSES = {
  created: 'created',
  pending: 'pending',
  done: 'done',
  canselled: 'canselled',
};

// Объект с сообщениями об ошибках
export const ERRORS = {
  ingredients: {
    title: 'Ошибка при загрузке ингредиентов',
    text: 'Произошла ошибка при получении данных ингредиентов. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при загрузке ингредиентов',
    },
  },
  allOrders: {
    title: 'Ошибка при загрузке списка заказов',
    text: 'Произошла ошибка при получении данных списка заказов. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при загрузке списка заказов',
    },
  },
  userOrders: {
    title: 'Ошибка при получении данных заказов пользователя',
    text: 'Произошла ошибка при получении данных о заказах пользователя. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при получении данных заказов пользователя',
    },
  },
  orderStatus: {
    title: 'Ошибка при получении статуса заказа',
    text: 'Произошла ошибка при получении статуса заказа. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при получении статуса заказа',
    },
  },
  placeOrder: {
    title: 'Ошибка при оформлении заказа',
    text: 'Произошла ошибка при оформлении заказа. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при оформлении заказа',
    },
  },
};

// Имя cookie для хранения refreshToken
export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export const MAIN_PATHS = {
  home: '/',
  ingredientDetails: '/ingredients/:ingredientId',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  feed: '/feed',
  feedDetails: '/feed/:feedNumber',
  feedStatus: '/feed/:feedNumber/status',
  newFeed: '/new-feed',
  profileOrdersStatus: '/profile/orders/:feedNumber/status',
  notFound: '*',
};

export const PROFILE_PATHS = {
  profileForm: '',
  orders: 'orders',
  ordersDetails: 'orders/:feedNumber',
  ordersStatus: 'orders/:feedNumber/status',
};
