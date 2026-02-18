import { type FC } from "react";
import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { EditProfileForm } from "./components";

export const EditProfile: FC<SectionProps> = (props) => {
  return (
    <ProfileSection
      title="Редактирование"
      {...props}
    >
      <EditProfileForm onBack={props.onBack} />
    </ProfileSection>
  );
};
