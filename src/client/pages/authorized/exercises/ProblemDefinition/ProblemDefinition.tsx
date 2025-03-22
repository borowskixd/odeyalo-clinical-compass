import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import { ExercisePageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const ProblemDefinitionPage: FC = () => {
  return (
    <ExercisePageLayout
      imageSrc={problemDefinition.src}
      exerciseTitle={"Определение групп (категорий) проблем"}
      exerciseStartLink={"/"}
      history={[]}
    />
  );
};
