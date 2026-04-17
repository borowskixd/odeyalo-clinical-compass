"use client";

import { Text } from "@odeyalo/uikit";
import { type FC, type ReactNode } from "react";
import { ProfileImage } from "../../images";
import styles from "./styles.module.scss";
import type { GetPsychologistsResponseData } from "@/shared/types";

interface Props {
  userData: GetPsychologistsResponseData[number];
  children?: ReactNode;
}

export const UserCard: FC<Props> = ({ userData, children }) => {
  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          className={styles.profileImage}
          src={userData.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <Text className={styles.username}>{userData.username}</Text>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
