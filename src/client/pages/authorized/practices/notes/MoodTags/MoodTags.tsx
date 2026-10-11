"use client";

import { type FC } from "react";
import { OtherButton, TagsForm } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  FormErrorLabel,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetMoodTagsQuery } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";

export const MoodTagsPage: FC = () => {
  const { data, isLoading, isError, error } = useGetMoodTagsQuery();

  if (isLoading) {
    return <LoadingLoop />;
  }

  if (isError) {
    return <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>;
  }

  const categories = (data ?? []).filter((c) => !c.allowCustomText);
  const other = (data ?? []).find((c) => c.allowCustomText);

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Что повлияло?</PageTitle>

        <div className={styles.grid}>
          {categories.map((category) => (
            <TagsForm
              key={category.id}
              data={category}
              onChange={(selected) => console.log(category.id, selected)}
            />
          ))}
        </div>

        {other && (
          <OtherButton
            onChange={(selected, text) => console.log("other", selected, text)}
          />
        )}
      </ContentWrapper>
    </Container>
  );
};
