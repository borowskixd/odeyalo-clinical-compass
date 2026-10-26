import { type FC } from "react";
import { PsychologistSurveyForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";

export const PsychologistSurveyPage: FC = () => {
  return (
    <FormPageLayout title="Анкета психиатра">
      <PsychologistSurveyForm />
    </FormPageLayout>
  );
};
