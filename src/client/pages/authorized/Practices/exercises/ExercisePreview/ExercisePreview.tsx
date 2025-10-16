"use client";

import { ExercisePageLayout } from "./components";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { pages } from "@/shared/data";
import { type FC } from "react";

type ExerciseData = {
  id: string;
  title: string;
  link_to_image: string;
  description: string;
};

const exerciseData: ExerciseData = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  title: "Как сделать то,\nчего делать не хочется",
  link_to_image: "images/image.jpg",
  description:
    "Позволяет принять осознанный выбор в пользу\nчего-то полезного, но что может вызывать\nтревогу или неприятные ощущения",
};

export const ExercisePreviewPage: FC = () => {
  return (
    <ExercisePageLayout
      imageSrc={kptDiaryImage.src}
      exerciseTitle={exerciseData.title}
      exerciseDescription={exerciseData.description}
      exerciseStartLink={pages.exercisePreview.path}
      history={[]}
    />
  );
};
