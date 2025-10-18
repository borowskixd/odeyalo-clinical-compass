"use client";

import { ExerciseHeader } from "../../components";
import { ButtonsContainer, FormGenerator } from "./components";
import styles from "./styles.module.scss";
import {
  type ExerciseStructureData,
  type FormValuesType,
  type ValueType,
} from "./types";
import { generateInitialValue } from "./utils";
import { Container, ContentWrapper } from "@/client/components";
import { type FC, type FormEventHandler, useCallback, useState } from "react";

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
          id: "what_i_dont_wanna_do",
        },
        {
          title: "Почему я не хочу это делать?",
          view: "default",
          type: "input",
          placeholder: "Мне кажется...",
          prompt: null,
          id: "why_i_dont_wanna_do",
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
          id: "minuses",
        },
        {
          title: "Плюсы этого",
          view: "default",
          type: "addable_list",
          placeholder: "У меня будет своё жильё...",
          prompt: null,
          id: "pluses",
        },
      ],
    },
  ],
};

export const ExercisePage: FC = () => {
  const [values, setValues] = useState<FormValuesType>(
    generateInitialValue(exerciseStructureData),
  );
  const [pageNumber, setPageNumber] = useState<number>(0);

  const changeHandler = useCallback((name: string, value: ValueType) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  }, []);

  const nextPageHandler = () => {
    setPageNumber((pageNumber) => {
      if (pageNumber + 1 < exerciseStructureData.pages.length) {
        return pageNumber + 1;
      }
      return exerciseStructureData.pages.length - 1;
    });
  };

  const prevPageHandler = () => {
    setPageNumber((pageNumber) => {
      if (pageNumber > 0) {
        return pageNumber - 1;
      }
      return 0;
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.log(values);
  };

  return (
    <Container>
      <ContentWrapper>
        <ExerciseHeader
          title={exerciseStructureData.title}
          description={exerciseStructureData.description}
        />
        <form
          onSubmit={submitHandler}
          className={styles.form}
        >
          <FormGenerator
            exerciseStructure={exerciseStructureData}
            pageNumber={pageNumber}
            changeHandler={changeHandler}
          />
          <ButtonsContainer
            prevPageHandler={prevPageHandler}
            nextPageHandler={nextPageHandler}
            isFirstPage={pageNumber === 0}
            isLastPage={pageNumber === exerciseStructureData.pages.length - 1}
          />
        </form>
      </ContentWrapper>
    </Container>
  );
};
