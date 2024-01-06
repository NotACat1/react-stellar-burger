import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// Подключение компонентов
import RenderContent from '../../components/render-content/render-content';

// Подключение Redux
import { useSelector } from 'react-redux';

// Подключение стилей
import { ERRORS } from '../../utils/constants';

// Основной компонент приложения
export default function NewFeedPage() {
  const state = { background: '/' };

  // Извлечение данных из состояния Redux
  const { isRequesting, hasRequestFailed, order } = useSelector((state) => state.burgerData);
  return (
    <RenderContent isLoading={isRequesting} hasError={hasRequestFailed} error={ERRORS.placeOrder}>
      <Navigate to={`/feed/${order}/status`} state={state} replace={true} />
    </RenderContent>
  );
}
