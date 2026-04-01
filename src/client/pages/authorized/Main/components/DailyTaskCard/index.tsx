import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { type GetDailyTasksResponse } from "@/shared/types";
import { getDailyTaskLink } from "@/shared/utils";

interface DailyTasks {
  dailyTask: GetDailyTasksResponse[number];
}

export const DailyTaskCard: FC<DailyTasks> = ({ dailyTask }) => {
  const { taskId, taskType, linkToPicture } = dailyTask;

  const taskLink = getDailyTaskLink(taskType, taskId);

  return (
    <Link
      href={taskLink ?? "#"}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={linkToPicture}
          className={styles.image}
        />
      </div>
      <p className={styles.tag}>{taskType === "test" ? "Тест" : "Практика"}</p>
    </Link>
  );
};
