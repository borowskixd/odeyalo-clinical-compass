import { StartAndHistory } from "./components";
import { ExercisePageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const KptDiariesPage: FC = () => {
  return (
    <ExercisePageLayout>
      <StartAndHistory />
    </ExercisePageLayout>
  );
};
