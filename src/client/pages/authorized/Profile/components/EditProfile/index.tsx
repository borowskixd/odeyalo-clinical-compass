import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { type FC } from "react";

export const EditProfile: FC<SectionProps> = (props) => {
  return (
    <ProfileSection
      title="Редактирование"
      {...props}
    ></ProfileSection>
  );
};
