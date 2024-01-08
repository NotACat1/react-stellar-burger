import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

// Подключение компонентов
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

// Подключение Redux
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../services/actions/user';
import { login } from '../../services/thunk/user';

// Подключение стилей и данных
import styles from './login.module.css';
import useForm from '../../utils/useForm';

export default function LoginPage() {
  // Получение диспетчера Redux и активной вкладки и ссылок на элементы
  const dispatch = useDispatch();
  // Получение данных из Redux-стейта
  const { isRequestingLogin: isRequesting, hasRequestLoginFailed: hasRequesFailed } = useSelector(
    (state) => state.userData,
  );

  // Использование хука для управления значениями формы
  const { values, handleChange } = useForm({ email: '', password: '' });
  // Состояние для отслеживания отправки формы
  const [isFormSubmitted, setisFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch(startLogin());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setisFormSubmitted(true);
    if (!values.email || !values.password) return;
    dispatch(login(values));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        {/* Компонент для ввода email */}
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
        {/* Компонент для ввода пароля */}
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name="password"
          // Показываем ошибку, если форма была отправлена и поле не заполнено
          error={isFormSubmitted && !values.password}
          errorText="Это поле должно быть заполнено."
          autoComplete="user-password"
        />
        {/* Показываем ошибку, если запрос не отправлен и есть ошибка входа */}
        {!isRequesting && hasRequesFailed && (
          <p className="text text_type_main-default text_color_error">
            Ошибка входа. Пожалуйста, попробуйте еще раз позже.
          </p>
        )}
        {/* Кнопка для отправки формы */}
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.actions}>
        {/* Ссылка для регистрации нового пользователя */}
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?&nbsp;
          <Link to="/register" className={styles.actions__link}>
            Зарегистрироваться
          </Link>
        </p>
        {/* Ссылка для восстановления пароля */}
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={styles.actions__link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}
