import { Text } from "@odeyalo/uikit";
import { FC } from "react";
import { Task } from "../Task";
import styles from "./styles.module.scss";
import { GetTasksResponseData } from "@/shared/types";
import { getCurrentDay } from "@/shared/utils";

interface DayTasksProps {
  date?: Date;
  tasks: GetTasksResponseData["completed"][keyof GetTasksResponseData["completed"]];
  readonly?: boolean;
}

export const DayTasks: FC<DayTasksProps> = ({
  date,
  tasks,
  readonly = false,
}) => {
  const [day, dateText] = getCurrentDay(date).split(",");

  return (
    <div>
      <Text
        className={styles.date}
        variant="body-l-bold"
      >
        {date ? day : "сегодня"} <span>{dateText}</span>
      </Text>
      <ul className={styles.list}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              taskId={task.id}
              completed={task.completed}
              task={task.task}
              readonly={readonly}
            />
          );
        })}
      </ul>
    </div>
  );
};
