"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { Button, ProfileImage } from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/client/hooks";
import { selectProfile, useLogoutMutation } from "@/client/redux";
import { redirectWithReload } from "@/client/utils";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC, useEffect, useRef, useState } from "react";

export const ProfileButton: FC = () => {
  const router = useRouter();
  const profile = useAppSelector(selectProfile);
  const [logout, { isSuccess }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useClickOutside(
    popupRef,
    () => {
      setIsPopupOpen(false);
    },
    buttonRef,
  );

  const togglePopup = () => {
    setIsPopupOpen((value) => !value);
  };

  useEffect(() => {
    if (isSuccess) {
      redirectWithReload(pages.login.path);
    }
  }, [isSuccess, dispatch, router]);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className={styles.profileContainer}>
      <button
        onClick={togglePopup}
        ref={buttonRef}
        className={styles.profileButton}
      >
        <ProfileImage
          src=""
          alt="profile"
          size={36}
        />
      </button>
      {isPopupOpen && (
        <div
          className={styles.popup}
          ref={popupRef}
        >
          <Button
            className={styles.popupItem}
            href={pages.profile.path}
          >
            Перейти в профиль
          </Button>
          {(profile.role === ACCESS.hr ||
            profile.role === ACCESS.psychologist) && (
            <Button
              href={pages.cabinet.path}
              className={styles.popupItem}
            >
              Кабинет {profile.role === ACCESS.hr ? "HR" : "психолога"}
            </Button>
          )}
          <Button
            className={styles.popupItem}
            href={pages.psychologist.path}
          >
            Психологи
          </Button>
          <Button
            className={styles.popupItem}
            onClick={logoutHandler}
          >
            Выйти
          </Button>
          {profile.role === ACCESS.client && (
            <Button
              className={styles.popupItem}
              href={pages.hrSurvey.path}
            >
              Анкета HR
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
