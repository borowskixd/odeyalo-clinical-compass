import { type FC } from "react";
import { Header, History, ImageWrapper } from "./components";
import styles from "./styles.module.scss";

interface Props {
  imageSrc: string;
  exerciseTitle: string;
  exerciseDescription?: string;
  exerciseStartLink: string;
  history?: {
    id: string;
    title: string;
    date: string;
    link: string;
  }[];
  completed?: boolean;
  locked?: boolean;
}

export const ExercisePageLayout: FC<Props> = ({
  imageSrc,
  exerciseTitle,
  exerciseDescription,
  exerciseStartLink,
  history,
  completed = false,
  locked = false,
}) => {
  return (
    <ImageWrapper
      imageSrc={imageSrc}
      className={styles.content}
    >
      <Header
        title={exerciseTitle}
        description={exerciseDescription}
        startLink={exerciseStartLink}
        completed={completed}
        locked={locked}
      />
      {history && <History history={history} />}
    </ImageWrapper>
  );
};
