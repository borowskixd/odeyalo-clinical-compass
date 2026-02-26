"use client";

import { Button } from "@odeyalo/uikit";
import { FC } from "react";
import { CreateTaskForm } from "../../../Tasks/components/CreateTaskForm";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";

export const TasksPreview: FC = () => {
  return (
    <div>
      <CreateTaskForm />
      <Button
        href={pages.tasks.path}
        width="max"
        className={styles.button}
      >
        Перейти к задачам
      </Button>
    </div>
  );
};
