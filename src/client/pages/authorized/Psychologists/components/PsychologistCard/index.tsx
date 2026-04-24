"use client";

import { Button, Modal } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { SendApplicationForm } from "../SendApplicationForm";
import styles from "./styles.module.scss";
import { UserCard } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectRole } from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type GetPsychologistsResponseData } from "@/shared/types";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const PsychologistCard: FC<Props> = ({ psychologist }) => {
  const role = useAppSelector(selectRole);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <UserCard
      userData={psychologist}
      subtitle="Психолог"
    >
      <div className={styles.inquiries}>
        {psychologist.inquiries.map((inquiry) => (
          <Button
            key={inquiry.id}
            size="xs"
            view="secondary"
            className={styles.inquiry}
            readOnly
          >
            {inquiry.text}
          </Button>
        ))}
      </div>
      <div className={styles.buttons}>
        <Button
          href={pages.psychologistProfile.getLink({
            params: { id: psychologist.userId },
          })}
          width="max"
          view="primary"
        >
          Профиль
        </Button>
        {role === ACCESS.client && (
          <>
            <Button
              width="max"
              view="inverse"
              onClick={openModal}
            >
              Оставить заявку
            </Button>
            <Modal
              title="Заявка психологу"
              onOpenChange={setModalIsOpen}
              open={modalIsOpen}
              disableBodyScrollLock={true}
            >
              <SendApplicationForm
                psychologistId={psychologist.userId}
                closeModal={closeModal}
              />
            </Modal>
          </>
        )}
      </div>
    </UserCard>
  );
};
