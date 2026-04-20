"use client";

import { Text } from "@odeyalo/uikit";
import { type FC, type ReactNode } from "react";
import { ProfileImage } from "../../images";
import styles from "./styles.module.scss";

export interface UserCardData {
  username: string;
  profileImage: string;
}

interface Props {
  userData: UserCardData;
  subtitle?: ReactNode;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export const UserCard: FC<Props> = ({
  userData,
  subtitle,
  className = "",
  contentClassName = "",
  children,
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <ProfileImage
          className={styles.profileImage}
          src={userData.profileImage}
          alt={userData.username}
          size={48}
        />
        <div className={styles.userInfo}>
          <Text className={styles.username}>{userData.username}</Text>
          {subtitle && (
            <Text
              variant="body-m"
              className={styles.subtitle}
            >
              {subtitle}
            </Text>
          )}
        </div>
      </div>
      <div className={`${styles.content} ${contentClassName}`}>{children}</div>
    </div>
  );
};
