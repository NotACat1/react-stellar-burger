import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Подключение компонентов
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  FeedPage,
  NewFeedPage,
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import FeedDetails from '../feed-details/feed-details';
import FeedStatus from '../feed-status/feed-status';
import OnlyAuth from '../only-auth/only-auth';
import OnlyUnauth from '../only-unauth/only-unauth';

// Основной компонент для управления маршрутизацией
export default function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  // Массив объектов маршрутов
  const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/ingredients/:ingredientId', element: <IngredientDetails /> },
    { path: '/login', element: <OnlyUnauth element={<LoginPage />} path="/profile" /> },
    { path: '/register', element: <OnlyUnauth element={<RegisterPage />} path="/profile" /> },
    { path: '/forgot-password', element: <OnlyUnauth element={<ForgotPasswordPage />} path="/profile" /> },
    { path: '/reset-password', element: <OnlyUnauth element={<ResetPasswordPage />} path="/profile" /> },
    { path: '/profile/*', element: <OnlyAuth element={<ProfilePage />} /> },
    { path: '/feed', element: <FeedPage /> },
    { path: '/feed/:feedNumber', element: <FeedDetails /> },
    { path: '/feed/:feedNumber/status', element: <FeedStatus /> },
    { path: '*', element: <NotFoundPage /> },
  ];

  const routesBackground = [
    {
      path: '/ingredients/:ingredientId',
      element: (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      ),
    },
    {
      path: '/feed/:feedNumber',
      element: (
        <Modal onClose={closeModal}>
          <FeedDetails />
        </Modal>
      ),
    },
    {
      path: '/feed/:feedNumber/status',
      element: (
        <Modal onClose={closeModal}>
          <FeedStatus />
        </Modal>
      ),
    },
    {
      path: '/new-feed',
      element: (
        <Modal onClose={closeModal}>
          <NewFeedPage />
        </Modal>
      ),
    },
    {
      path: '/profile/orders/:feedNumber',
      element: (
        <Modal onClose={closeModal}>
          <FeedDetails />
        </Modal>
      ),
    },
    {
      path: '/profile/orders/:feedNumber/status',
      element: (
        <Modal onClose={closeModal}>
          <FeedStatus />
        </Modal>
      ),
    },
  ];

  // Определение маршрутов приложения
  return (
    <>
      <Routes location={background || location}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {background && (
        <Routes>
          {routesBackground.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      )}
    </>
  );
}
