"use client";

import { Text } from "odeyalo-uikit";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { type FC } from "react";

type ExerciseStructureData = {
  id: string;
  title: string;
  link_to_image: string;
  description: string;
  closed: false;
  pages: {
    page_number: number;
    sections: {
      title: string;
      view: "default" | "primary";
      type: "input" | "addable_list";
      placeholder: string;
      prompt: string | null;
      name: string;
    }[];
  }[];
};

const exerciseStructureData: ExerciseStructureData = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  title: "Сделать то,\nчего делать не хочется",
  link_to_image: "images/image.jpg",
  description:
    "Позволяет принять осознанный выбор в пользу\nчего-то полезного, но что может вызывать\nтревогу или неприятные ощущения",
  closed: false,
  pages: [
    {
      page_number: 0,
      sections: [
        {
          title: "Чем я не хочу заниматься?",
          view: "primary",
          type: "input",
          placeholder: "Брать ипотеку или просить повышения...",
          prompt: null,
          name: "what_i_dont_wanna_do",
        },
        {
          title: "Почему я не хочу это делать?",
          view: "default",
          type: "input",
          placeholder: "Мне кажется....",
          prompt: null,
          name: "why_i_dont_wanna_do",
        },
      ],
    },
    {
      page_number: 1,
      sections: [
        {
          title: "Минусы этого",
          view: "primary",
          type: "addable_list",
          placeholder: "Нужно много об этом думать...",
          prompt: null,
          name: "minuses",
        },
        {
          title: "Плюсы этого",
          view: "default",
          type: "addable_list",
          placeholder: "У меня будет своё жильё...",
          prompt: null,
          name: "pluses",
        },
      ],
    },
  ],
};

export const ExercisePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <PageTitle>{exerciseStructureData.title}</PageTitle>
        <Text variant="body-l">{exerciseStructureData.description}</Text>
      </ContentWrapper>
    </Container>
  );
};
