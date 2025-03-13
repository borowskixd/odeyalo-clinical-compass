import { HrSurveyForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const HrSurveyPage: FC = () => {
  return (
    <FormPageLayout title="Анкета HR">
      <HrSurveyForm />
    </FormPageLayout>
  );
};
