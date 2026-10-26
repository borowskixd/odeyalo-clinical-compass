"use client";

import { Button, Modal, Text } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { UserCard } from "../UserCard";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/client/hooks";
import { SendApplicationForm } from "@/client/pages/authorized/Psychologists/components";
import { selectRole } from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { type GetPsychologistResponseData } from "@/shared/types";
import { mapAgeToText } from "@/shared/utils";

interface Props {
  profile: GetPsychologistResponseData;
}

const getFieldValue = (value: string): string => {
  return value.trim() ? value : "не указано";
};

export const PsychologistProfileCard: FC<Props> = ({ profile }) => {
  const role = useAppSelector(selectRole);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const education = [
    profile.higherEducationUniversity,
    profile.higherEducationSpecialization,
  ]
    .filter((el) => el.trim())
    .join(", ");

  const details = [
    {
      label: "Возраст",
      value: profile.age === 0 ? "не указан" : mapAgeToText(profile.age),
    },
    { label: "Образование", value: getFieldValue(education) },
    {
      label: "Академическая степень",
      value: getFieldValue(profile.academicDegree),
    },
    { label: "Курсы", value: getFieldValue(profile.courses) },
    { label: "Формат работы", value: getFieldValue(profile.workFormat) },
    { label: "Ассоциация", value: getFieldValue(profile.association) },
  ];

  return (
    <UserCard
      userData={{
        username: profile.username,
        profileImage: profile.profileImage,
      }}
      subtitle="Психиатр"
      className={styles.card}
    >
      <div className={styles.details}>
        {details.map((detail) => {
          return (
            <div
              key={detail.label}
              className={styles.detailItem}
            >
              <Text
                variant="body-m-bold"
                className={styles.detailLabel}
              >
                {detail.label}
              </Text>
              <Text className={styles.detailValue}>{detail.value}</Text>
            </div>
          );
        })}
      </div>

      <div className={styles.inquiriesBlock}>
        <Text
          variant="body-m-bold"
          className={styles.detailLabel}
        >
          Запросы
        </Text>
        {profile.inquiries.length ? (
          <div className={styles.inquiries}>
            {profile.inquiries.map((inquiry) => {
              return (
                <Button
                  key={inquiry.id}
                  size="xs"
                  view="secondary"
                  readOnly
                  className={styles.inquiry}
                >
                  {inquiry.text}
                </Button>
              );
            })}
          </div>
        ) : (
          <Text className={styles.detailValue}>не указаны</Text>
        )}
      </div>
      {role === ACCESS.client && (
        <>
          <Button
            width="max"
            view="primary"
            onClick={openModal}
            className={styles.button}
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
              psychologistId={profile.userId}
              closeModal={closeModal}
            />
          </Modal>
        </>
      )}
    </UserCard>
  );
};
