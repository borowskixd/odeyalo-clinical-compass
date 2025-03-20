import { Header, History } from "./components";
import { ImageContentLayout } from "@/client/components/layouts";
import { type FC } from "react";

interface Props {
  imageSrc: string;
  exerciseTitle: string;
  exerciseDescription?: string;
  exerciseStartLink: string;
  history: {
    id: string;
    title: string;
    date: string;
    link: string;
  }[];
}

export const ExercisePageLayout: FC<Props> = ({
  imageSrc,
  exerciseTitle,
  exerciseDescription,
  exerciseStartLink,
  history,
}) => {
  return (
    <ImageContentLayout imageSrc={imageSrc}>
      <Header
        title={exerciseTitle}
        description={exerciseDescription}
        startLink={exerciseStartLink}
      />
      <History history={history} />
    </ImageContentLayout>
  );
};
