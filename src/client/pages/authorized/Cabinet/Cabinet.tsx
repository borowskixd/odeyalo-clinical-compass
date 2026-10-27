"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";
import {
  AlertsCard,
  ApplicationCard,
  ClientCard,
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useAppSelector, useClosedAlerts } from "@/client/hooks";
import {
  selectRole,
  useGetApplicationsQuery,
  useGetClientsQuery,
  useGetPsychologistAlertsQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";

export const CabinetPage: FC = () => {
  const role = useAppSelector(selectRole);
  const isPsychologist = role === ACCESS.psychologist;

  const clientsQuery = useGetClientsQuery();
  const applicationsQuery = useGetApplicationsQuery();
  const alertsQuery = useGetPsychologistAlertsQuery(undefined, {
    skip: !isPsychologist,
  });

  const { closedIds, closeAlert } = useClosedAlerts();

  if (clientsQuery.isLoading || applicationsQuery.isLoading) {
    return <LoadingLoop />;
  }

  if (clientsQuery.isError) return <DefaultError error={clientsQuery.error} />;
  if (applicationsQuery.isError) {
    return <DefaultError error={applicationsQuery.error} />;
  }

  const visibleAlerts =
    alertsQuery.data?.filter((alert) => !closedIds.has(alert.testResultId)) ??
    [];

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Кабинет психиатра</PageTitle>

        {isPsychologist && !!visibleAlerts.length && (
          <div>
            <div className={styles.list}>
              {visibleAlerts.map((alert) => (
                <AlertsCard
                  key={alert.testResultId}
                  alert={alert}
                  onClose={closeAlert}
                />
              ))}
            </div>
          </div>
        )}

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
              ? `Мои ${isPsychologist ? "пациенты" : "сотрудники"}`
              : `У вас нет ${isPsychologist ? "пациентов" : "сотрудников"}`}
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
