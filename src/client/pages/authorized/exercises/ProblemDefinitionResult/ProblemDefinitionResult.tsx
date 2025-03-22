import styles from "./styles.module.scss";
import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import { ImageContentPageLayout } from "@/client/components/layouts";
import { ExerciseTextareaResult } from "@/client/pages/authorized/exercises/components";
import { type FC } from "react";

export const ProblemDefinitionResultPage: FC = () => {
  return (
    <ImageContentPageLayout
      imageSrc={problemDefinition.src}
      className={styles.content}
    >
      <div className={styles.date}>05.10.2024 9:30</div>
      <div className={styles.answers}>
        <ExerciseTextareaResult
          value={"Работа"}
          labelText={"В какой сфере вы испытываете трудности?"}
        />
        <ExerciseTextareaResult
          value={"Злость"}
          labelText={"Что вы чувствуете по этому поводу?"}
        />
        <ExerciseTextareaResult
          value={"Научиться контролировать гнев"}
          labelText={"Чего вы хотите добиться, когда решите проблему?"}
        />
      </div>
    </ImageContentPageLayout>
  );
};
