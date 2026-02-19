import { type FC } from "react";
import { ChangePasswordForm } from "./components";
import { FormPageLayout } from "@/client/components/layouts";

export const ChangePasswordPage: FC = () => {
  return (
    <FormPageLayout title="Смена пароля">
      <ChangePasswordForm />
    </FormPageLayout>
  );
};
