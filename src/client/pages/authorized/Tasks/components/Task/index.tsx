import {
  Button,
  Icon,
  Icons20,
  Icons24Solid,
  Popup,
  Text,
} from "@odeyalo/uikit";
import cl from "classnames";
import { FC, useState } from "react";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import {
  Button as DefaultButton,
  FormikForm,
  IconButton,
  Modal,
} from "@/client/components";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/client/redux";
import { CreateTaskRequestData } from "@/shared/types";

const validationSchema = Yup.object().shape({
  task: Yup.string().required("Данное поле обязательно"),
});

interface TaskProps {
  taskId: string;
  task: string;
  completed?: boolean;
  readonly?: boolean;
}

export const Task: FC<TaskProps> = ({
  taskId,
  task,
  completed = false,
  readonly = false,
}) => {
  const [updateTask, updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTask, deleteTaskMutation] = useDeleteTaskMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);

  const initialValues: CreateTaskRequestData = {
    task,
  };

  const handleComplete = () => {
    updateTask({
      taskId,
      task,
      completed: !completed,
    });
  };

  const handleDelete = () => {
    deleteTask(taskId);
  };

  const handleEdit = ({ task }: CreateTaskRequestData) => {
    updateTask({
      taskId,
      completed,
      task,
    }).then(() => {
      setEdit(false);
    });
  };

  const handleOpen = () => setOpen((open) => !open);
  const handleStartEdit = () => {
    setOpen(false);
    setEdit(true);
  };
  const handleEndEdit = () => setEdit(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpen(false);
  };

  return (
    <li className={cl(styles.task, completed ? styles.completed : null)}>
      {edit ? (
        <FormikForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleEdit}
          className={styles.form}
        >
          <FormikForm.Input
            name="task"
            placeholder="Новая задача"
            disabled={updateTaskMutation.isLoading}
            className={styles.input}
          />
          <IconButton
            type="submit"
            disabled={updateTaskMutation.isLoading}
          >
            <Icon
              data={Icons20.PencilIcon}
              size={20}
            />
          </IconButton>
          <IconButton
            view="action"
            width="max"
            disabled={updateTaskMutation.isLoading}
            className={styles.cancelButton}
            onClick={handleEndEdit}
          >
            <Icon
              data={Icons24Solid.XMarkIcon}
              size={24}
            />
          </IconButton>
        </FormikForm>
      ) : (
        <>
          <DefaultButton
            className={styles.mark}
            disabled={readonly || updateTaskMutation.isLoading}
            onClick={!readonly ? handleComplete : undefined}
          >
            <div className={styles.point}></div>
          </DefaultButton>
          <div className={styles.taskContent}>
            <Text variant="body-l">{task}</Text>
            {!readonly && (
              <>
                <DefaultButton
                  ref={setButtonElement}
                  onClick={handleOpen}
                >
                  <Icon
                    data={Icons24Solid.EllipsisVerticalIcon}
                    size={24}
                  />
                </DefaultButton>
                <Popup
                  anchorElement={buttonElement}
                  open={open}
                  onOpenChange={setOpen}
                  placement="bottom-end"
                >
                  <div className={styles.popup}>
                    <Button
                      size="xs"
                      width="max"
                      view="action"
                      onClick={handleStartEdit}
                    >
                      Редактировать
                    </Button>
                    <Button
                      size="xs"
                      width="max"
                      className={styles.deleteButton}
                      onClick={handleOpenModal}
                    >
                      Удалить
                    </Button>
                    <Modal
                      isOpen={openModal}
                      onCloseAction={handleCloseModal}
                      title={"Удалить задачу?"}
                      content={
                        <div className={styles.modalButtons}>
                          <Button
                            width="max"
                            onClick={handleCloseModal}
                          >
                            Отмена
                          </Button>
                          <Button
                            className={styles.acceptDeleteButton}
                            width="max"
                            onClick={handleDelete}
                            disabled={deleteTaskMutation.isLoading}
                          >
                            Удалить
                          </Button>
                        </div>
                      }
                    />
                  </div>
                </Popup>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
};
