// React и ReactDOM - основные библиотеки для разработки интерфейса
import React from 'react';
import ReactDOM from 'react-dom';

// Компонент App - основной компонент приложения
import App from './components/app/app';

// Функция для измерения производительности приложения
import reportWebVitals from './reportWebVitals';

// Redux - библиотека для управления состоянием приложения
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// rootReducer - корневой редюсер, объединяющий все редюсеры в приложении
import { rootReducer } from './services/reducers';

// Redux Thunk - middleware для обработки асинхронных действий в Redux
import thunk from 'redux-thunk';

// react-dnd - библиотека для реализации перетаскивания и бросания (DnD)
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

// Подключение стилей
import './index.css';

// Настройка Redux DevTools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Создание хранилища Redux с применением middleware
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

// Рендеринг основного компонента с поддержкой DnD и Redux
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
