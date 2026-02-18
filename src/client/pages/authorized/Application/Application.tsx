"use client";

import { useParams, useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  ApplicationProfileCard,
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
} from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import { PassedTests } from "@/client/pages/authorized/Application/components";
import {
  PopupsService,
  selectRole,
  useConfirmApplicationMutation,
  useGetApplicationQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";

export const ApplicationPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const role = useAppSelector(selectRole);

  const { data: application, ...getApplicationState } =
    useGetApplicationQuery(id);
  const [confirmApplication, confirmApplicationState] =
    useConfirmApplicationMutation();

  useEffect(() => {
    if (confirmApplicationState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Операция успешно выполнена!"),
      );
      router.push(pages.cabinet.path);
    }
  }, [confirmApplicationState.isSuccess, dispatch, router]);

  const onClickHandler = () => {
    if (application) {
      confirmApplication(application.id);
    }
  };

  if (getApplicationState.isLoading) return <LoadingLoop />;
  if (getApplicationState.isError)
    return <DefaultError error={getApplicationState.error} />;

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>
          Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
        </PageTitle>
        <div className={styles.main}>
          {application && <ApplicationProfileCard profile={application} />}
          <div>
            {!!application && (
              <>
                <PassedTests userId={application.userId} />
                <div className={styles.buttons}>
                  <PrimaryButton onClick={onClickHandler}>
                    Принять заявку
                  </PrimaryButton>
                </div>
              </>
            )}
          </div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
