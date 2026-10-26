import { type FC } from "react";
import { UserCard } from "@/client/components";
import { type GetPsychologistsResponseData } from "@/shared/types";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const MyPsychologistCard: FC<Props> = ({ psychologist }) => {
  return (
    <UserCard
      userData={psychologist}
      subtitle="Психиатр"
    />
  );
};
