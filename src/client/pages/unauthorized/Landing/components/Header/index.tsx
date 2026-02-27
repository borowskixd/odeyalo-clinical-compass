import { type FC } from "react";
import { Logo, NavBar, RightButton } from "./components";
import styles from "./styles.module.scss";
import { Container } from "@/client/components";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Logo />
        <NavBar />
        <RightButton />
      </Container>
    </header>
  );
};
