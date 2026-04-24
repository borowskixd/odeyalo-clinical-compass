"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";
import {
  ApplicationCard,
  ClientCard,
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import {
  selectRole,
  useGetApplicationsQuery,
  useGetClientsQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";

export const CabinetPage: FC = () => {
  const role = useAppSelector(selectRole);

  const clientsQuery = useGetClientsQuery();
  const applicationsQuery = useGetApplicationsQuery();

  if (clientsQuery.isLoading || applicationsQuery.isLoading) {
    return <LoadingLoop />;
  }

  if (clientsQuery.isError) return <DefaultError error={clientsQuery.error} />;
  if (applicationsQuery.isError) {
    return <DefaultError error={applicationsQuery.error} />;
  }

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>
          Кабинет {role === ACCESS.psychologist ? "психолога" : "HR-менеджера"}
        </PageTitle>
        {!!applicationsQuery.data && !!applicationsQuery.data.length && (
          <div>
            <h2 className={styles.subtitle}>Заявки</h2>
            <div className={styles.list}>
              {applicationsQuery.data.map((application) => {
                return (
                  <ApplicationCard
                    key={application.userId}
                    application={application}
                  />
                );
              })}
            </div>
          </div>
        )}
        <div>
          <h2 className={`${styles.subtitle} ${styles.clientsSubtitle}`}>
            {!!clientsQuery.data && clientsQuery.data.length
              ? `Мои ${role === ACCESS.psychologist ? "клиенты" : "сотрудники"}`
              : `У вас нет ${
                  role === ACCESS.psychologist ? "клиентов" : "сотрудников"
                }`}
          </h2>
          <div className={styles.list}>
            {clientsQuery.data &&
              clientsQuery.data.map((client) => {
                return (
                  <ClientCard
                    key={client.userId}
                    client={client}
                  />
                );
              })}
          </div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
