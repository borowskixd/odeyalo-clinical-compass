"use client";

import { Button, Icon, Icons24Solid } from "@odeyalo/uikit";
import { FC, useState } from "react";
import * as Yup from "yup";
import { DayTasks } from "../DayTasks";
import styles from "./styles.module.scss";
import {
  DefaultError,
  FormikForm,
  IconButton,
  LoadingLoop,
} from "@/client/components";
import { useCreateTaskMutation, useGetTasksQuery } from "@/client/redux";
import { CreateTaskRequestData, GetTaskResponseData } from "@/shared/types";
import { mapDateToApiDateFormat } from "@/shared/utils";

const initialValues: CreateTaskRequestData = {
  task: "",
};

const validationSchema = Yup.object().shape({
  task: Yup.string().required("Данное поле обязательно"),
});

export const CreateTaskForm: FC = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const [createTask, createTaskMutation] = useCreateTaskMutation();

  const [create, setCreate] = useState<boolean>(false);

  const renderContent = () => {
    if (isLoading) return <LoadingLoop />;
    if (isError || !tasks) return <DefaultError error={error} />;

    const result: GetTaskResponseData[] = [];

    for (const date in tasks.uncompleted) {
      result.push(...tasks.uncompleted[date]);
    }

    for (const date in tasks.completed) {
      if (date === mapDateToApiDateFormat(new Date())) {
        result.push(...tasks.completed[date]);
        break;
      }
    }

    result.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });

    return <DayTasks tasks={result} />;
  };

  const handleStartCreate = () => setCreate(true);
  const handleEndCreate = () => setCreate(false);

  const handleSubmit = (values: CreateTaskRequestData) => {
    createTask(values).then(() => {
      setCreate(false);
    });
  };

  return (
    <>
      <div className={styles.tasks}>{renderContent()}</div>
      {!create ? (
        <Button
          view="action"
          width="max"
          onClick={handleStartCreate}
        >
          <Icon
            data={Icons24Solid.PlusIcon}
            size={24}
          />
        </Button>
      ) : (
        <FormikForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <FormikForm.Input
            name="task"
            placeholder="Новая задача"
            disabled={createTaskMutation.isLoading}
            className={styles.input}
          />
          <IconButton
            type="submit"
            view="action"
            width="max"
            disabled={createTaskMutation.isLoading}
          >
            <Icon
              data={Icons24Solid.PlusIcon}
              size={24}
            />
          </IconButton>
          <IconButton
            view="action"
            width="max"
            disabled={createTaskMutation.isLoading}
            className={styles.cancelButton}
            onClick={handleEndCreate}
          >
            <Icon
              data={Icons24Solid.XMarkIcon}
              size={24}
            />
          </IconButton>
        </FormikForm>
      )}
    </>
  );
};
