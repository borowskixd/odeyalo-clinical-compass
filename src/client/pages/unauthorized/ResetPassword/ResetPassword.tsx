import { type FC } from "react";
import { ResetPasswordForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";
import { pages } from "@/shared/data";

export const ResetPasswordPage: FC = () => {
  return (
    <FormPageLayout
      title="Восстановление пароля"
      comeBackLink={pages.login.path}
    >
      <ResetPasswordForm />
    </FormPageLayout>
  );
};
