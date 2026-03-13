"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { useRegistrationMutation } from "@/client/redux";
import { mapApiErrorMessage, redirectWithReload } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { type RegistrationRequestData } from "@/shared/types";

const initialValues: RegistrationRequestData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Данное поле обязательно"),
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
  password: Yup.string().required("Данное поле обязательно"),
  confirmPassword: Yup.string()
    .required("Данное поле обязательно")
    .oneOf([Yup.ref("password")], "Пароли не совпадают"),
});

export const RegistrationForm: FC = () => {
  const dispatch = useAppDispatch();
  const [registration, { data, isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("register-page-opened");
  }, [logEvent]);

  useEffect(() => {
    if (isSuccess) {
      redirectWithReload(pages.login.path);
      logEvent("register-success");
    }
  }, [isSuccess, dispatch, data, logEvent]);

  const onSubmit = (values: RegistrationRequestData) => {
    registration(values);
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="username"
        type="text"
        placeholder="Имя"
        disabled={isLoading}
      />
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
      <FormikForm.Input
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        disabled={isLoading}
      />
      {isError && error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <div className={styles.buttons}>
        <Button
          type="submit"
          view="primary"
          width="max"
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
        <Button
          href={pages.login.path}
          view="secondary"
          width="max"
        >
          Войти
        </Button>
      </div>
    </FormikForm>
  );
};
