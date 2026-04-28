"use client";

import { Button, Text } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";
import { UserCard } from "../UserCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import {
  PopupsService,
  useConfirmApplicationMutation,
  useGetInquiriesQuery,
} from "@/client/redux";
import { type GetApplicationsResponseData } from "@/shared/types";

interface Props {
  application: GetApplicationsResponseData[number];
}

const getApplicantName = (value: string): string => {
  return value.trim() ? value : "Пользователь";
};

const getProblemText = (value: string): string => {
  return value.trim() ? value : "Текст заявки не указан";
};

export const ApplicationCard: FC<Props> = ({ application }) => {
  const dispatch = useAppDispatch();
  const { data: inquiries, ...getInquiriesQuery } = useGetInquiriesQuery();
  const [confirmApplication, confirmApplicationState] =
    useConfirmApplicationMutation();

  useEffect(() => {
    if (confirmApplicationState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Операция успешно выполнена!"),
      );
    }
  }, [confirmApplicationState.isSuccess, dispatch]);

  const onClickHandler = () => {
    if (application) {
      confirmApplication(application.id);
    }
  };

  const renderContent = () => {
    if (getInquiriesQuery.isLoading) return <LoadingLoop />;
    if (getInquiriesQuery.isError || !inquiries)
      return <DefaultError error={getInquiriesQuery.error} />;

    return (
      <div className={styles.inquiries}>
        {application.inquiry.map((inquiry) => {
          const el = inquiries.find((el) => el.id === inquiry);

          if (!el) return null;
          return (
            <Button
              size="xs"
              key={inquiry}
              readOnly
              className={styles.inquiry}
            >
              {el.text}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <UserCard
      userData={{
        username: getApplicantName(application.username),
        profileImage: application.profileImage,
      }}
      subtitle="Новая заявка"
      className={styles.card}
    >
      <div>
        <Text variant="body-m-bold">Запрос:</Text>
        <Text className={styles.problem}>
          {getProblemText(application.problem)}
        </Text>
      </div>
      {renderContent()}
      <div className={styles.actions}>
        {/*<Button*/}
        {/*  href={pages.application.getLink({ params: { id: application.id } })}*/}
        {/*  size="m"*/}
        {/*  width="max"*/}
        {/*  view="primary"*/}
        {/*>*/}
        {/*  Профиль*/}
        {/*</Button>*/}
        <Button
          onClick={onClickHandler}
          size="m"
          width="max"
          view="primary"
        >
          Принять
        </Button>
      </div>
    </UserCard>
  );
};
