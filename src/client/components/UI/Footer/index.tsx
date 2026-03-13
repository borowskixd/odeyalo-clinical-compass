"use client";

import { Button, Icon, Modal } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import { LogoIcon, TelegramIcon, VkIcon } from "@/client/assets/icons";
import { Container, SecondaryButton, UserAgreement } from "@/client/components";
import { pages } from "@/shared/data";

export const Footer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
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
                <Button
                  view="default"
                  width="max"
                  href="https://vk.com/discuss_with_cbt"
                  target="_blank"
                >
                  <Icon
                    data={VkIcon}
                    size={24}
                  />
                </Button>
                <Button
                  view="default"
                  width="max"
                  href="https://t.me/discuss_with_cbt"
                  target="_blank"
                >
                  <Icon
                    data={TelegramIcon}
                    size={24}
                  />
                </Button>
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
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Пользовательское соглашение и политика конфиденциальности"
      >
        <UserAgreement />
      </Modal>
    </>
  );
};
