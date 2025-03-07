import { Header, Result } from "./components";
import { ExercisePageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const KptDiaryResultPage: FC = () => {
  return (
    <ExercisePageLayout>
      <Header />
      <Result />
    </ExercisePageLayout>
  );
};
