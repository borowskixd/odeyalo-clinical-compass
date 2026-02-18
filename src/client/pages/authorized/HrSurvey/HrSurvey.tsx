import { type FC } from "react";
import { HrSurveyForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";

export const HrSurveyPage: FC = () => {
  return (
    <FormPageLayout title="Анкета HR">
      <HrSurveyForm />
    </FormPageLayout>
  );
};
