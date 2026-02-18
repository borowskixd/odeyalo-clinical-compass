import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Modal } from "@/client/components";
import { useDeleteMeMutation, useLogoutMutation } from "@/client/redux";
import { redirectWithReload } from "@/client/utils";
import { pages } from "@/shared/data";

export const LogoutButtons: FC = () => {
  const [logout, logoutState] = useLogoutMutation();
  const [deleteAccount, deleteAccountState] = useDeleteMeMutation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (logoutState.isSuccess || deleteAccountState.isSuccess) {
      redirectWithReload(pages.login.path);
    }
  }, [logoutState.isSuccess, deleteAccountState.isSuccess]);

  const logoutHandler = () => {
    logout();
  };

  const deleteAccountHandler = () => {
    deleteAccount();
  };

  const openLogoutModalHandler = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModalHandler = () => {
    setIsLogoutModalOpen(false);
  };

  const openDeleteAccountModalHandler = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const closeDeleteAccountModalHandler = () => {
    setIsDeleteAccountModalOpen(false);
  };

  return (
    <div className={styles.buttons}>
      <Modal
        isOpen={isLogoutModalOpen}
        onCloseAction={closeLogoutModalHandler}
        title={"Выйти из аккаунта?"}
        content={
          <div className={styles.modalButtons}>
            <Button
              width="max"
              onClick={closeLogoutModalHandler}
            >
              Остаться
            </Button>
            <Button
              className={styles.acceptDeleteButton}
              width="max"
              onClick={logoutHandler}
              disabled={logoutState.isLoading}
            >
              Выйти
            </Button>
          </div>
        }
      />
      <Modal
        isOpen={isDeleteAccountModalOpen}
        onCloseAction={closeDeleteAccountModalHandler}
        title={"Вы уверены, что хотите удалить аккаунт?"}
        content={
          <div className={styles.modalButtons}>
            <Button
              width="max"
              onClick={closeDeleteAccountModalHandler}
            >
              Отмена
            </Button>
            <Button
              className={styles.acceptDeleteButton}
              width="max"
              onClick={deleteAccountHandler}
              disabled={deleteAccountState.isLoading}
            >
              Удалить аккаунт
            </Button>
          </div>
        }
      />
      <Button
        view="secondary"
        width="max"
        onClick={openLogoutModalHandler}
      >
        Выйти
      </Button>
      <Button
        className={styles.deleteButton}
        width="max"
        onClick={openDeleteAccountModalHandler}
      >
        Удалить аккаунт
      </Button>
    </div>
  );
};
