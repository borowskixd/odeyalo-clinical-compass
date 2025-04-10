"use client";

import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import { DefaultError, LoadingLoop } from "@/client/components";
import { ExercisePageLayout } from "@/client/components/layouts";
import { useGetProblemDefinitionsQuery } from "@/client/redux/features/problemDefinitions";
import { pages } from "@/shared/data";
import { formatDate } from "@/shared/utils";
import { type FC } from "react";

export const ProblemDefinitionPage: FC = () => {
  const { data: history, ...getProblemDefinitions } =
    useGetProblemDefinitionsQuery();

  if (getProblemDefinitions.isLoading) return <LoadingLoop />;
  if (getProblemDefinitions.isError || !history)
    return <DefaultError error={getProblemDefinitions.error} />;

  return (
    <ExercisePageLayout
      imageSrc={problemDefinition.src}
      exerciseTitle={"Определение групп (категорий) проблем"}
      exerciseStartLink={pages.problemDefinitionForm.path}
      history={history.map(({ id, createdAt, sphere }) => ({
        id,
        title: sphere,
        date: formatDate(createdAt),
        link: pages.problemDefinitionResult.getLink({ params: { id } }),
      }))}
    />
  );
};
