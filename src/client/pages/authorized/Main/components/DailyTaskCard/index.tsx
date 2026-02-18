import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { type GetDailyTasksResponse } from "@/shared/types";
import { getDailyTaskLink } from "@/shared/utils";

interface DailyTasks {
  dailyTask: GetDailyTasksResponse[number];
  isActive?: boolean;
  isExist?: boolean;
}

export const DailyTaskCard: FC<DailyTasks> = ({
  dailyTask,
  isActive = false,
  isExist = true,
}) => {
  const { title, description, taskId, taskType, completed } = dailyTask;

  const taskLink = getDailyTaskLink(taskType, taskId);

  if (!isExist) return null;

  return (
    <Link
      href={taskLink ?? "#"}
      className={`${styles.card} ${completed ? styles.completed : ""} ${isActive ? styles.active : ""}`}
    >
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={styles.cardDescription}>{description}</p>
    </Link>
  );
};
