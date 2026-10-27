"use client";

import { Button, Icon, Icons20 } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectProfile } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";

export const ProfileContent: FC = () => {
  const userData = useAppSelector(selectProfile);
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("profile-page-opened");
  }, [logEvent]);

  return (
    <div className={styles.container}>
      <div className={styles.pictureContainer}>
        <Icon
          data={Icons20.UserIcon}
          size={96}
        />
      </div>
      <div className={styles.content}>
        <PageTitle className={styles.title}>{userData.username}</PageTitle>
        <div className={styles.main}>
          <Button
            width="max"
            align="center"
            size="l"
            href={pages.profileSettings.path}
          >
            Настройки
          </Button>
        </div>
      </div>
    </div>
  );
};
