import { PsychologistSurveyForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const PsychologistSurveyPage: FC = () => {
  return (
    <FormPageLayout title="Анкета психолога">
      <PsychologistSurveyForm />
    </FormPageLayout>
  );
};
