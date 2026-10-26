"use client";

import { useParams } from "next/navigation";
import { type FC } from "react";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PsychologistProfileCard,
} from "@/client/components";
import { useGetPsychologistQuery } from "@/client/redux";

export const PsychologistPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: psychologist, ...getPsychologistState } =
    useGetPsychologistQuery(id);

  if (getPsychologistState.isLoading) return <LoadingLoop />;
  if (getPsychologistState.isError)
    return <DefaultError error={getPsychologistState.error} />;

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Профиль психиатра</PageTitle>
        {psychologist && <PsychologistProfileCard profile={psychologist} />}
      </ContentWrapper>
    </Container>
  );
};
