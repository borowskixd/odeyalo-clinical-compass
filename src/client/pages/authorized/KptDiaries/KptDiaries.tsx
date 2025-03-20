"use client";

import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { DefaultError, LoadingLoop } from "@/client/components";
import { ExercisePageLayout } from "@/client/components/layouts";
import { useGetKptDiariesQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { formatDate } from "@/shared/utils";
import { type FC } from "react";

export const KptDiariesPage: FC = () => {
  const { data: diaries, ...getDiariesStatus } = useGetKptDiariesQuery();

  if (getDiariesStatus.isLoading) return <LoadingLoop />;
  if (getDiariesStatus.isError || !diaries)
    return <DefaultError error={getDiariesStatus.error} />;

  return (
    <ExercisePageLayout
      imageSrc={kptDiaryImage.src}
      exerciseTitle={"КПТ-Дневник"}
      exerciseDescription={
        "Это способ самоанализа, который позволяет отслеживать эмоции и чувства,\nвыявлять взаимосвязи между ситуациями и мыслями."
      }
      exerciseStartLink={pages.kptDiaryForm.path}
      history={diaries.map(({ id, situation, createdAt }) => {
        return {
          id,
          title: situation,
          date: formatDate(createdAt),
          link: pages.kptDiaryResults.getLink({ params: { id } }),
        };
      })}
    />
  );
};
