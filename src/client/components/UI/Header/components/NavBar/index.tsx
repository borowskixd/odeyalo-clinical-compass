"use client";

import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { Flame, Grid4, Leaderboard, TextSnippet } from "@/client/assets/icons";
import { SecondaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectProfile } from "@/client/redux";
import { type ACCESS } from "@/shared/config/access";
import { type ActiveNavId, pages } from "@/shared/data";
import { type FC } from "react";

interface NavLink {
  href: string;
  activeNavId: ActiveNavId;
  title: string;
  Icon?: FC<any>;
}

type Nav = Record<keyof typeof ACCESS, NavLink[]>;

const rolesNav: Nav = {
  admin: [
    {
      href: pages.usersActivity.path,
      activeNavId: pages.usersActivity.activeNavId,
      title: "Активность пользователей",
    },
    {
      href: pages.usersFeedbacks.path,
      activeNavId: pages.usersFeedbacks.activeNavId,
      title: "Обратная связь",
    },
    {
      href: pages.usersResults.path,
      activeNavId: pages.usersResults.activeNavId,
      title: "Результаты тестов",
    },
  ],
  client: [
    {
      href: pages.main.path,
      activeNavId: pages.main.activeNavId,
      title: "План",
      Icon: Grid4,
    },
    {
      href: pages.articles.path,
      activeNavId: pages.articles.activeNavId,
      title: "Теория",
      Icon: TextSnippet,
    },
    {
      href: pages.practices.path,
      activeNavId: pages.practices.activeNavId,
      title: "Практика",
      Icon: Flame,
    },
    {
      href: pages.tests.path,
      activeNavId: pages.tests.activeNavId,
      title: "Тесты",
      Icon: Leaderboard,
    },
  ],
  hr: [
    {
      href: pages.main.path,
      activeNavId: pages.main.activeNavId,
      title: "План",
      Icon: Grid4,
    },
    {
      href: pages.articles.path,
      activeNavId: pages.articles.activeNavId,
      title: "Теория",
      Icon: TextSnippet,
    },
    {
      href: pages.practices.path,
      activeNavId: pages.practices.activeNavId,
      title: "Практика",
      Icon: Flame,
    },
    {
      href: pages.tests.path,
      activeNavId: pages.tests.activeNavId,
      title: "Тесты",
      Icon: Leaderboard,
    },
  ],
  psychologist: [
    {
      href: pages.main.path,
      activeNavId: pages.main.activeNavId,
      title: "План",
      Icon: Grid4,
    },
    {
      href: pages.articles.path,
      activeNavId: pages.articles.activeNavId,
      title: "Теория",
      Icon: TextSnippet,
    },
    {
      href: pages.practices.path,
      activeNavId: pages.practices.activeNavId,
      title: "Практика",
      Icon: Flame,
    },
    {
      href: pages.tests.path,
      activeNavId: pages.tests.activeNavId,
      title: "Тесты",
      Icon: Leaderboard,
    },
  ],
  unauthorized: [],
};

export const NavBar: FC = () => {
  const { role } = useAppSelector(selectProfile);
  const pathname = usePathname();

  const navList = rolesNav[role];

  if (!navList.length) return null;

  const currentPage = Object.values(pages).find((page) =>
    page.matchPath(pathname),
  );

  return (
    <nav className={styles.nav}>
      {navList.map(({ title, href, activeNavId, Icon }) => (
        <SecondaryButton
          key={title}
          className={`${styles.navLink} ${activeNavId === currentPage.activeNavId ? styles.active : ""}`}
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
