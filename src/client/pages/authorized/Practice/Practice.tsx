import { PageTitle } from "@/client/components";
import { ExercisePageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const PracticePage: FC = () => {
  return (
    <ExercisePageLayout>
      <PageTitle>Упражнение!</PageTitle>
    </ExercisePageLayout>
  );
};
