"use client";

import { Button, Icon, Text } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { LogoIcon, TelegramIcon, VkIcon } from "@/client/assets/icons";
import { Container } from "@/client/components";
import { pages } from "@/shared/data";

export const Footer: FC = () => {
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
          <Button
            view="unstyled"
            className={styles.privacyButton}
            href={pages.policy.path}
            target="_blank"
          >
            Политика конфиденциальности
          </Button>
          <Text className={styles.inn}>ИНН: 701718203368</Text>
        </Container>
      </footer>
    </>
  );
};
