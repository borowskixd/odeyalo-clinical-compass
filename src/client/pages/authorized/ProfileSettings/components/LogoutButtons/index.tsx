import { Button, Modal } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
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
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        title={"Выйти из аккаунта?"}
      >
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
      </Modal>
      <Modal
        open={isDeleteAccountModalOpen}
        onOpenChange={setIsDeleteAccountModalOpen}
        title={"Вы уверены, что хотите удалить аккаунт?"}
      >
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
      </Modal>
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
