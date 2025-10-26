"use client";

import { FormGenerator } from "./components";
import styles from "./styles.module.scss";
import { Text } from "odeyalo-uikit";
import { Container, ContentWrapper } from "@/client/components";
import { ExerciseHeader } from "@/client/pages/authorized/practices/components";
import { mapDatetimeToText } from "@/shared/utils";
import { type FC } from "react";

type ExerciseResultData = {
  id: string;
  exercise_id: string;
  title: string;
  link_to_image: string;
  description: string;
  date: string;
  sections: {
    title: string;
    view: "primary" | "default";
    type: "input" | "addable_list";
    value: string | string[];
  }[];
};

const exerciseResultData: ExerciseResultData = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
  exercise_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  title: "Сделать то,\nчего делать не хочется",
  link_to_image: "images/image.jpg",
  description:
    "Позволяет принять осознанный выбор в пользу\nчего-то полезного, но что может вызывать\nтревогу или неприятные ощущения",
  date: "2025-10-02T15:36:00",
  sections: [
    {
      title: "Чем я не хочу заниматься?",
      view: "primary",
      type: "input",
      value: "Брать ипотеку",
    },
    {
      title: "Почему я не хочу это делать?",
      view: "default",
      type: "input",
      value: "Мне кажется это не выгодно",
    },
    {
      title: "Минусы этого",
      view: "primary",
      type: "addable_list",
      value: ["Нужно много об этом думать"],
    },
    {
      title: "Плюсы этого",
      view: "default",
      type: "addable_list",
      value: ["У меня будет своё жильё"],
    },
  ],
};

export const ExerciseResultPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <ExerciseHeader
          title={exerciseResultData.title}
          description={exerciseResultData.description}
          action={
            <div className={styles.datetime}>
              <Text variant="body-s">
                {mapDatetimeToText(exerciseResultData.date)}
              </Text>
            </div>
          }
        />
        <FormGenerator exerciseStructure={exerciseResultData} />
      </ContentWrapper>
    </Container>
  );
};
