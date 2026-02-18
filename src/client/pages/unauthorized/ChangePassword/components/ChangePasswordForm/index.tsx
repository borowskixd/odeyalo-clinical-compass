"use client";

import { Button } from "@odeyalo/uikit";
import { useParams, useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { PopupsService, useChangePasswordMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";

interface ChangePasswordFields {
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: ChangePasswordFields = {
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("Данное поле обязательно"),
  confirmNewPassword: Yup.string()
    .required("Данное поле обязательно")
    .oneOf([Yup.ref("newPassword")], "Пароли не совпадают"),
});

export const ChangePasswordForm: FC = () => {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [changePassword, { isError, isLoading, isSuccess, error }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(PopupsService.openSnackbarWithDelay("Пароль успешно изменен"));
      router.push(pages.login.path);
    }
  }, [isSuccess, dispatch, router]);

  const onSubmit = (values: ChangePasswordFields) => {
    changePassword({
      ...values,
      token,
    });
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="newPassword"
        type="password"
        disabled={isLoading}
        placeholder="Новый пароль"
      />
      <FormikForm.Input
        name="confirmNewPassword"
        type="password"
        disabled={isLoading}
        placeholder="Повторите пароль"
      />
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        view="action"
        width="max"
      >
        Сменить пароль
      </Button>
    </FormikForm>
  );
};
