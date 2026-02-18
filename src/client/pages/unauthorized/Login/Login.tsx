import { type FC } from "react";
import { LoginForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";

export const LoginPage: FC = () => {
  return (
    <FormPageLayout title="Войти">
      <LoginForm />
    </FormPageLayout>
  );
};
