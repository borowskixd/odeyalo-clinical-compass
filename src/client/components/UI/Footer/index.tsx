"use client";

import Link from "next/link";
import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import { LogoIcon, TelegramIcon, VkIcon } from "@/client/assets/icons";
import {
  Container,
  IconButton,
  Modal,
  SecondaryButton,
  UserAgreement,
} from "@/client/components";
import { pages } from "@/shared/data";

export const Footer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <footer className={styles.footer}>
        <Container className={styles.container}>
          <div className={styles.nav}>
            <Link
              href={pages.main.path}
              className={styles.logo}
            >
              <LogoIcon />
            </Link>
            <div className={styles.contactBlock}>
              <span className={styles.contactTitle}>Связаться с нами</span>
              <div className={styles.socials}>
                <IconButton
                  className={styles.iconButton}
                  href="https://vk.com/discuss_with_cbt"
                  target="_blank"
                >
                  <VkIcon />
                </IconButton>
                <IconButton
                  className={styles.iconButton}
                  href="https://t.me/discuss_with_cbt"
                  target="_blank"
                >
                  <TelegramIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <SecondaryButton
            className={styles.privacyButton}
            onClick={openModalHandler}
          >
            Политика конфиденциальности
          </SecondaryButton>
        </Container>
      </footer>

      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModalHandler}
        title="Пользовательское соглашение и политика конфиденциальности"
        content={<UserAgreement />}
      />
    </>
  );
};
