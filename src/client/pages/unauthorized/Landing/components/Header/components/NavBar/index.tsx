import styles from "./styles.module.scss";
import { SecondaryButton } from "@/client/components";
import { type FC } from "react";

interface NavLink {
  href: string;
  title: string;
}

const navList: NavLink[] = [
  { href: "/#landing-advantages", title: "Преимущества" },
  { href: "/#landing-achievements", title: "Достижения" },
  { href: "/#landing-team", title: "О нас" },
  { href: "/#landing-partners", title: "Партнёры" },
];

export const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      {navList.map((el) => (
        <SecondaryButton
          key={el.title}
          className={styles.navLink}
          href={el.href}
        >
          {el.title}
        </SecondaryButton>
      ))}
    </nav>
  );
};
