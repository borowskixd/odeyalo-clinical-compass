import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";
import { type GetUserPassedExercisesResponseData } from "@/shared/types";
import { mapDatetimeToText } from "@/shared/utils";

interface Props {
  result: GetUserPassedExercisesResponseData["results"][number];
  userId?: string;
}

export const ExerciseResultCard: FC<Props> = ({ result, userId }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{result.exerciseTitle}</div>
      {!!result.preview && (
        <div className={styles.preview}>{result.preview}</div>
      )}
      <div className={styles.date}>{mapDatetimeToText(result.date)}</div>
      <Link
        className={styles.link}
        href={pages.exerciseResult.getLink({
          params: {
            id: result.exerciseId,
            result_id: result.id,
          },
          queryParams: userId
            ? {
                userId,
              }
            : undefined,
        })}
      >
        Посмотреть результат
      </Link>
    </div>
  );
};
