import { Modal } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/client/components";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={isOpen}
      onOpenChange={onCancel}
      title="Вы уверены, что хотите удалить этот отзыв?"
    >
      <div className={styles.modalButtons}>
        <Button onClick={onConfirm}>Удалить</Button>
        <Button onClick={onCancel}>Отмена</Button>
      </div>
    </Modal>
  );
};
