import { type FC } from "react";
import { RegistrationForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";

export const RegistrationPage: FC = () => {
  return (
    <FormPageLayout title="Регистрация">
      <RegistrationForm />
    </FormPageLayout>
  );
};
