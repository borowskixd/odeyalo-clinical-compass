import { Form } from "./components";
import { ExercisePageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const KptDiaryFormPage: FC = () => {
  return (
    <ExercisePageLayout>
      <Form />
    </ExercisePageLayout>
  );
};
