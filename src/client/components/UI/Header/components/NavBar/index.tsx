"use client";

import styles from "./styles.module.scss";
import { Flame, Grid4, Leaderboard, TextSnippet } from "@/client/assets/icons";
import { SecondaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectProfile } from "@/client/redux";
import { type ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC } from "react";

interface NavLink {
  href: string;
  title: string;
  Icon?: FC<any>;
}

type Nav = Record<keyof typeof ACCESS, NavLink[]>;

const rolesNav: Nav = {
  admin: [
    { href: pages.usersAcitivity.path, title: "Активность пользователей" },
    { href: pages.usersFeedbacks.path, title: "Обратная связь" },
    { href: pages.usersResults.path, title: "Результаты тестов" },
  ],
  client: [
    { href: pages.main.path, title: "План", Icon: Grid4 },
    { href: pages.articles.path, title: "Теория", Icon: TextSnippet },
    { href: pages.psychologist.path, title: "Психологи", Icon: Flame },
    { href: pages.exercises.path, title: "Тесты", Icon: Leaderboard },
  ],
  hr: [
    { href: pages.main.path, title: "План", Icon: Grid4 },
    { href: pages.articles.path, title: "Теория", Icon: TextSnippet },
    { href: pages.psychologist.path, title: "Психологи", Icon: Flame },
    { href: pages.exercises.path, title: "Тесты", Icon: Leaderboard },
  ],
  psychologist: [
    { href: pages.main.path, title: "План", Icon: Grid4 },
    { href: pages.articles.path, title: "Теория", Icon: TextSnippet },
    { href: pages.psychologist.path, title: "Психологи", Icon: Flame },
    { href: pages.exercises.path, title: "Тесты", Icon: Leaderboard },
  ],
  unauthorized: [],
};

export const NavBar: FC = () => {
  const { role } = useAppSelector(selectProfile);

  const navList = rolesNav[role];

  if (!navList.length) return null;

  return (
    <nav className={styles.nav}>
      {navList.map(({ title, href, Icon }) => (
        <SecondaryButton
          key={title}
          className={styles.navLink}
          href={href}
        >
          {!!Icon && (
            <div className={`${styles.iconWrapper}`}>
              <Icon />
            </div>
          )}
          {title}
        </SecondaryButton>
      ))}
    </nav>
  );
};
