"use client";

import { ExercisePageLayout } from "./components";
import { mapDateToTextValue } from "odeyalo-uikit/dist/components/date/DatePicker/utils";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { pages } from "@/shared/data";
import { type FC } from "react";

type ResultData = {
  id: string;
  exercise_id: string;
  date: string;
  preview: string;
};

type ExerciseData = {
  id: string;
  title: string;
  link_to_image: string;
  description: string;
  results: ResultData[];
};

const exerciseData: ExerciseData = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  title: "Как сделать то,\nчего делать не хочется",
  link_to_image: "images/image.jpg",
  description:
    "Позволяет принять осознанный выбор в пользу\nчего-то полезного, но что может вызывать\nтревогу или неприятные ощущения",
  results: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      exercise_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      date: "2025-10-02",
      preview: "Брать ипотеку",
    },
  ],
};

export const ExercisePreviewPage: FC = () => {
  return (
    <ExercisePageLayout
      imageSrc={kptDiaryImage.src}
      exerciseTitle={exerciseData.title}
      exerciseDescription={exerciseData.description}
      exerciseStartLink={pages.exercise.getLink({
        params: {
          id: exerciseData.id,
        },
      })}
      history={exerciseData.results.map((result) => ({
        id: result.id,
        title: result.preview,
        date: mapDateToTextValue(new Date(result.date)),
        link: pages.exerciseResult.getLink({
          params: {
            id: result.exercise_id,
            result_id: result.id,
          },
        }),
      }))}
    />
  );
};
