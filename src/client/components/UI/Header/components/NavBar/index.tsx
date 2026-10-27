"use client";

import { Icon, type IconProps, Icons24Solid } from "@odeyalo/uikit";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { SecondaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectProfile } from "@/client/redux";
import { type ACCESS } from "@/shared/config/access";
import { type ActiveNavId, pages } from "@/shared/data";

interface NavLink {
  href: string;
  activeNavId: ActiveNavId;
  title: string;
  icon?: IconProps["data"];
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
      icon: Icons24Solid.HomeIcon,
    },
    {
      href: pages.tests.path,
      activeNavId: pages.tests.activeNavId,
      title: "Тесты",
      icon: Icons24Solid.ChartBarIcon,
    },
  ],
  hr: [
    {
      href: pages.main.path,
      activeNavId: pages.main.activeNavId,
      title: "План",
      icon: Icons24Solid.HomeIcon,
    },
    {
      href: pages.tests.path,
      activeNavId: pages.tests.activeNavId,
      title: "Тесты",
      icon: Icons24Solid.ChartBarIcon,
    },
  ],
  psychologist: [
    {
      href: pages.main.path,
      activeNavId: pages.main.activeNavId,
      title: "План",
      icon: Icons24Solid.HomeIcon,
    },
    {
      href: pages.tests.path,
      activeNavId: pages.tests.activeNavId,
      title: "Тесты",
      icon: Icons24Solid.ChartBarIcon,
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
      {navList.map(({ title, href, activeNavId, icon }) => (
        <SecondaryButton
          key={title}
          className={`${styles.navLink} ${activeNavId === currentPage.activeNavId ? styles.active : ""}`}
          href={href}
        >
          {!!icon && (
            <div className={`${styles.iconWrapper}`}>
              <Icon
                data={icon}
                size={24}
              />
            </div>
          )}
          {title}
        </SecondaryButton>
      ))}
    </nav>
  );
};
