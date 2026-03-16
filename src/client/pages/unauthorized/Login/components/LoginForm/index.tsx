"use client";

import { Button } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC, useEffect } from "react";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { useLoginMutation, useYandexLoginQuery } from "@/client/redux";
import { mapApiErrorMessage, redirectWithReload } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { type LoginRequestData } from "@/shared/types";

const initialValues: LoginRequestData = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
  password: Yup.string().required("Данное поле обязательно"),
});

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const { logEvent } = useAnalytics();

  const { refetch: yandexLogin } = useYandexLoginQuery(undefined, {
    skip: true, // Не выполняем запрос автоматически
  });

  useEffect(() => {
    logEvent("login-page-opened");
  }, [logEvent]);

  useEffect(() => {
    if (isSuccess) {
      redirectWithReload(pages.main.path);
      logEvent("login-success");
    }
  }, [isSuccess, data, dispatch, logEvent]);

  const onSubmit = (values: LoginRequestData) => {
    login(values);
  };

  const handleYandexLogin = () => {
    logEvent("yandex-login-clicked");
    yandexLogin();
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="email"
        type="email"
        placeholder="Почта"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="password"
        type="password"
        placeholder="Пароль"
        disabled={isLoading}
      />
      <Link
        href={pages.resetPassword.path}
        className={styles.resetPasswordLink}
      >
        Восстановить пароль
      </Link>
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}

      {/* Яндекс авторизация */}
      <div className={styles.yandexDivider}>
        <span className={styles.dividerText}>или</span>
      </div>

      <Button
        onClick={handleYandexLogin}
        view="secondary"
        width="max"
        disabled={isLoading}
        className={styles.yandexButton}
      >
        <div className={styles.yandexButtonContent}>
          <YandexIcon />
          Войти через Яндекс
        </div>
      </Button>

      <div className={styles.buttons}>
        <Button
          type="submit"
          view="primary"
          width="max"
          disabled={isLoading}
        >
          Войти
        </Button>
        <Button
          href={pages.registration.path}
          view="secondary"
          width="max"
        >
          Зарегистрироваться
        </Button>
      </div>
    </FormikForm>
  );
};

// Иконка Яндекса
const YandexIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path d="M13 7h-2v6h2V7zm0 8h-2v2h2v-2z" />
  </svg>
);
