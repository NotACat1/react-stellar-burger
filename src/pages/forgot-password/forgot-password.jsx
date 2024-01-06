import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

// Подключение компонентов
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { startForgotPassword } from '../../services/actions/user';
import { forgotPassword } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './forgot-password.module.css';
import useForm from '../../utils/useForm';

export default function ForgotPasswordPage() {
  // Получение диспетчера Redux
  const dispatch = useDispatch();
  // Получение данных из Redux-стейта
  const {
    isRequestingForgotPassword: isRequesting,
    hasRequestForgotPasswordFailed: hasRequesFailed,
    isPasswordForgot,
  } = useSelector((state) => state.userData);

  // Использование хука для управления значениями формы
  const { values, handleChange } = useForm({ email: '' });
  // Состояние для отслеживания отправки формы
  const [isFormSubmitted, setisFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch(startForgotPassword());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setisFormSubmitted(true);
    if (!values.email) return;
    dispatch(forgotPassword(values.email));
  };

  //useEffect(() => {
  //  dispatch(setForgotPasswordLoading());
  //  dispatch(setForgotPasswordState(false));
  //}, [dispatch, setForgotPasswordState, setForgotPasswordLoading]);

  if (isPasswordForgot) {
    return <Navigate to="/reset-password" replace />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        {/* Компонент ввода e-mail */}
        <EmailInput
          type="email"
          onChange={handleChange}
          value={values.email}
          placeholder="E-mail"
          name="email"
          isIcon={false}
          // Показываем ошибку, если форма была отправлена и поле не заполнено
          error={isFormSubmitted && !values.email}
          errorText="Это поле должно быть заполнено."
          autoComplete="user-email"
        />
        {/* Отображение ошибки запроса восстановления пароля */}
        {!isRequesting && hasRequesFailed && (
          <p className="text text_type_main-default text_color_error">
            Ошибка восстановления пароля. Пожалуйста, попробуйте еще раз позже.
          </p>
        )}
        {/* Кнопка "Восстановить" */}
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      {/* Ссылка на страницу входа */}
      <div className={styles.actions}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?&nbsp;
          <Link to="/login" className={styles.actions__link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
