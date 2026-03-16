import { Text } from "@odeyalo/uikit";
import { FC } from "react";
import { Task } from "../Task";
import styles from "./styles.module.scss";
import { GetTasksResponseData } from "@/shared/types";
import { compareDates, getCurrentDay } from "@/shared/utils";

interface DayTasksProps {
  date?: Date;
  tasks: GetTasksResponseData["completed"][keyof GetTasksResponseData["completed"]];
  readonly?: boolean;
}

export const DayTasks: FC<DayTasksProps> = ({
  date = new Date(),
  tasks,
  readonly = false,
}) => {
  const [day] = getCurrentDay(date).split(",");
  const isToday = compareDates(date, new Date(), {
    date: true,
    month: true,
    fullYear: true,
  });

  return (
    <div>
      <Text
        className={styles.date}
        variant="body-l-bold"
      >
        {!isToday && (
          <>
            {day}{" "}
            <span>
              {`${date.getDay().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}`}
              {date.getFullYear() === new Date().getFullYear()
                ? ""
                : `.${date.getFullYear()}`}
            </span>
          </>
        )}
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
