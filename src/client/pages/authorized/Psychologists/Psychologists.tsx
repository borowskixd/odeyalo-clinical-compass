"use client";

import { type FC } from "react";
import { PsychologistCard } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetPsychologistsQuery } from "@/client/redux";

export const PsychologistsPage: FC = () => {
  const { data: psychologists, ...getPsychologistsState } =
    useGetPsychologistsQuery();
  // const { data: myPsychologists, ...getMyPsychologistsState } =
  //   useGetMyPsychologistsQuery();

  const renderContent = () => {
    // if (getPsychologistsState.isLoading || getMyPsychologistsState.isLoading)
    if (getPsychologistsState.isLoading) return <LoadingLoop />;
    if (getPsychologistsState.isError)
      return <DefaultError error={getPsychologistsState.error} />;
    // if (getMyPsychologistsState.isError)
    //   return <DefaultError error={getMyPsychologistsState.error} />;

    return (
      <>
        {/*<h2 className={styles.subtitle}>*/}
        {/*  {myPsychologists && myPsychologists.length*/}
        {/*    ? "Мои психологи"*/}
        {/*    : "У вас пока нет психологов"}*/}
        {/*</h2>*/}
        {/*<div className={styles.psychologistList}>*/}
        {/*  {myPsychologists &&*/}
        {/*    myPsychologists.map((psychologist) => (*/}
        {/*      <MyPsychologistCard*/}
        {/*        key={psychologist.userId}*/}
        {/*        psychologist={psychologist}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*</div>*/}
        <h2 className={styles.subtitle}>
          {psychologists && psychologists.length ? "Все психиатры" : ""}
        </h2>
        <div className={styles.psychologistList}>
          {psychologists &&
            psychologists.map((psychologist) => (
              <PsychologistCard
                key={psychologist.userId}
                psychologist={psychologist}
              />
            ))}
        </div>
      </>
    );
  };

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Психиатры</PageTitle>
        {renderContent()}
      </ContentWrapper>
    </Container>
  );
};
