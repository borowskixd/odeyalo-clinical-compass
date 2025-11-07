import styles from "./styles.module.scss";
import { Modal } from "@/client/components";
import { useLogoutMutation } from "@/client/redux";
import { redirectWithReload } from "@/client/utils";
import { pages } from "@/shared/data";
import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";

export const LogoutButtons: FC = () => {
  const [logout, { isSuccess }] = useLogoutMutation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      redirectWithReload(pages.login.path);
    }
  }, [isSuccess]);

  const logoutHandler = () => {
    logout();
  };

  const deleteAccountHandler = () => {
    console.log("delete account");
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
              className={styles.deleteButton}
              width="max"
              onClick={logoutHandler}
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
              className={styles.deleteButton}
              width="max"
              onClick={deleteAccountHandler}
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
