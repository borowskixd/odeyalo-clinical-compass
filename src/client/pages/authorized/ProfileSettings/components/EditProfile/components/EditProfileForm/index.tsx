"use client";

import { type SectionProps } from "../../../../types";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm, LoadingLoop } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import {
  PopupsService,
  useGetMeQuery,
  useUpdateMeMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { type UpdateUserRequestData } from "@/shared/types";
import { Button, Text } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";

type Props = Pick<SectionProps, "onBack">;

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Данное поле обязательно"),
  city: Yup.string(),
  gender: Yup.string()
    .nullable()
    .test("type-check", "Непредвиденная ошибка", (value) => {
      if (!value) return true;
      return value === "male" || value === "female";
    }),
  birthday: Yup.string()
    .nullable()
    .test("date-check", "Введите корректную дату", (value) => {
      if (!value) return true;

      return !isNaN(new Date(value).getTime());
    })
    .test(
      "max-date-check",
      "Дата рождения не может быть в будущем",
      (value) => {
        if (!value) return true;

        const date = new Date(value);

        return date < new Date();
      },
    ),
});

export const EditProfileForm: FC<Props> = ({ onBack }) => {
  const [updateProfile, updateProfileState] = useUpdateMeMutation();
  const { data: profileData, ...getProfileState } = useGetMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updateProfileState.isSuccess) {
      dispatch(PopupsService.openSnackbar("Профиль обновлен!"));
      onBack?.();
    }
  }, [onBack, updateProfileState.isSuccess, dispatch]);

  if (!profileData || getProfileState.isLoading) return <LoadingLoop />;

  const initialValues: UpdateUserRequestData = {
    username: profileData?.username ?? "",
    birthday: profileData?.birthDate ?? null,
    gender:
      profileData?.gender === "male"
        ? "male"
        : profileData?.gender === "female"
          ? "female"
          : null,
    city: profileData?.city ?? "",
  };

  const onSubmitHandler = (values: UpdateUserRequestData) => {
    updateProfile(values);
  };

  return (
    <div className={styles.container}>
      <Text
        as={"h2"}
        variant={"title-xs"}
        className={styles.subtitle}
      >
        Личные данные
      </Text>
      <FormikForm
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        <FormikForm.Input
          name="username"
          placeholder="Ваше имя"
        />
        <FormikForm.DatePicker
          name="birthday"
          placeholder="Дата рождения"
          maxValue={new Date()}
          minValue={new Date("01-01-1900")}
        />
        <FormikForm.Input
          name="city"
          placeholder="Ваш город"
        />
        {updateProfileState.isError && (
          <FormErrorLabel>
            {mapApiErrorMessage(updateProfileState.error)}
          </FormErrorLabel>
        )}
        <Button
          type="submit"
          view="action"
          width="max"
          disabled={updateProfileState.isLoading}
        >
          Сохранить
        </Button>
      </FormikForm>
    </div>
  );
};
