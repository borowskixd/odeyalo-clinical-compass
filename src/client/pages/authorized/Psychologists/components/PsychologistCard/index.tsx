"use client";

import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { UserCard } from "@/client/components";
import { type GetPsychologistsResponseData } from "@/shared/types";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const PsychologistCard: FC<Props> = ({ psychologist }) => {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  //
  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };
  //
  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  return (
    <UserCard userData={psychologist}>
      {/*<div className={styles.buttons}>*/}
      {/*  <PrimaryButton onClick={openModal}>Оставить заявку</PrimaryButton>*/}
      {/*</div>*/}
      {/*<Modal*/}
      {/*  title="Заявка психологу"*/}
      {/*  onOpenChange={setModalIsOpen}*/}
      {/*  open={modalIsOpen}*/}
      {/*  disableBodyScrollLock={true}*/}
      {/*>*/}
      {/*  <SendApplicationForm*/}
      {/*    psychologistId={psychologist.userId}*/}
      {/*    closeModal={closeModal}*/}
      {/*  />*/}
      {/*</Modal>*/}
      <div className={styles.inquiries}>
        {psychologist.inquiries.map((inquiry) => (
          <Button
            key={inquiry.id}
            size="xs"
            view="primary"
            readOnly
          >
            {inquiry.text}
          </Button>
        ))}
      </div>
    </UserCard>
  );
};
