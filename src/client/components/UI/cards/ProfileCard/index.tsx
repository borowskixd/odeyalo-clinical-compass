import { type FC } from "react";
import { ProfileImage } from "../../images";
import { Symptom } from "../../Symptom";
import styles from "./styles.module.scss";
import { type GetClientResponseData } from "@/shared/types";
import { mapAgeToText } from "@/shared/utils";

interface Props {
  profile: GetClientResponseData;
}

const mapGenderToText = (gender: string) => {
  switch (gender) {
    case "male":
      return "Мужской";
    case "female":
      return "Женский";
    default:
      return "Не указан";
  }
};

export const ProfileCard: FC<Props> = ({ profile }) => {
  const hasDescription = Boolean(profile.description.trim());

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.username}>{profile.username}</div>
          <div
            className={`${styles.status} ${
              profile.isOnline ? styles.isOnline : ""
            }`}
          >
            {profile.isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
      </div>
      <ProfileImage
        className={styles.profileImage}
        size={188}
        src={profile.profileImage}
        alt={profile.username}
      />
      <div className={styles.info}>
        Возраст: {profile.age === 0 ? "не указан" : mapAgeToText(profile.age)}
      </div>
      <div className={styles.info}>Пол: {mapGenderToText(profile.gender)}</div>
      {!!profile.problems.length && (
        <>
          <div className={styles.info}>Запрос:</div>
          <div className={styles.problems}>
            {profile.problems.map((problem, index) => {
              return (
                <Symptom
                  key={index}
                  problem={problem}
                />
              );
            })}
          </div>
        </>
      )}
      {hasDescription && (
        <div className={styles.description}>
          О пользователе: {profile.description}
        </div>
      )}
    </div>
  );
};
