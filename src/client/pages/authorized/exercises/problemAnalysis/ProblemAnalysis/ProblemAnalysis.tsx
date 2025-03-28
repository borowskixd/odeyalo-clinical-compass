import problemAnalysisImage from "@/client/assets/webp/pictures/problemAnalysisImage.webp";
import { ExercisePageLayout } from "@/client/components/layouts";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ProblemAnalysisPage: FC = () => {
  return (
    <ExercisePageLayout
      imageSrc={problemAnalysisImage}
      exerciseTitle={"Анализ проблемы"}
      exerciseStartLink={pages.problemAnalysisForm.path}
      history={[]}
    />
  );
};
