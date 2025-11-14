import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { EditProfileForm } from "./components";
import { type FC } from "react";

export const EditProfile: FC<SectionProps> = (props) => {
  return (
    <ProfileSection
      title="Редактирование"
      {...props}
    >
      <EditProfileForm />
    </ProfileSection>
  );
};
