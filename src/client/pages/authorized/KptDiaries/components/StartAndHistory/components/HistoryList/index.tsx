import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetKptDiariesQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { formatDate } from "@/shared/utils";
import { type FC } from "react";

export const HistoryList: FC = () => {
  const { data: diaries, ...getDiariesStatus } = useGetKptDiariesQuery();
  if (getDiariesStatus.isLoading) return <LoadingLoop />;
  if (getDiariesStatus.isError)
    return <DefaultError error={getDiariesStatus.error} />;
  return (
    <div className={styles.historyContainer}>
      <h3 className={styles.hText}>История</h3>
      {diaries && diaries.length === 0 && (
        <p>КПТ-дневник ещё не заполнялся. Самое время это сделать!</p>
      )}
      {diaries && diaries.length > 0 && (
        <div className={styles.diaryList}>
          {diaries.map(({ id, situation, createdAt }) => (
            <a
              key={id}
              className={styles.diaryContainer}
              href={pages.kptDiaryResults.getLink({ params: { id } })}
            >
              <p className={styles.DiaryText}>{situation}</p>
              <p className={styles.text}>{formatDate(createdAt)}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
