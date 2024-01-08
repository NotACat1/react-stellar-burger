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
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

// Подключение стилей и данных
import { MAIN_PATHS } from '../../utils/constants';

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
    { path: MAIN_PATHS.home, element: <HomePage /> },
    { path: MAIN_PATHS.ingredientDetails, element: <IngredientDetails /> },
    { path: MAIN_PATHS.login, element: <OnlyUnAuth element={<LoginPage />} /> },
    { path: MAIN_PATHS.register, element: <OnlyUnAuth element={<RegisterPage />}/> },
    { path: MAIN_PATHS.forgotPassword, element: <OnlyUnAuth element={<ForgotPasswordPage />} /> },
    { path: MAIN_PATHS.resetPassword, element: <OnlyUnAuth element={<ResetPasswordPage />} /> },
    { path: `${MAIN_PATHS.profile}/*`, element: <OnlyAuth element={<ProfilePage />} /> },
    { path: MAIN_PATHS.feed, element: <FeedPage /> },
    { path: MAIN_PATHS.feedDetails, element: <FeedDetails /> },
    { path: MAIN_PATHS.feedStatus, element: <FeedStatus /> },
    { path: MAIN_PATHS.notFound, element: <NotFoundPage /> },
  ];

  const routesBackground = [
    {
      path: MAIN_PATHS.ingredientDetails,
      element: (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      ),
    },
    {
      path: MAIN_PATHS.feedDetails,
      element: (
        <Modal onClose={closeModal}>
          <FeedDetails />
        </Modal>
      ),
    },
    {
      path: MAIN_PATHS.feedStatus,
      element: (
        <Modal onClose={closeModal}>
          <FeedStatus />
        </Modal>
      ),
    },
    {
      path: MAIN_PATHS.newFeed,
      element: (
        <Modal onClose={closeModal}>
          <NewFeedPage />
        </Modal>
      ),
    },
    {
      path: MAIN_PATHS.feedDetails,
      element: (
        <Modal onClose={closeModal}>
          <FeedDetails />
        </Modal>
      ),
    },
    {
      path: MAIN_PATHS.profileOrdersStatus,
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
