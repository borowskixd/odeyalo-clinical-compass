import { redirect } from "next/navigation";
import { type FC } from "react";
import {
  Achievements,
  Advantages,
  Header,
  Hero,
  Partners,
  Team,
} from "./components";
import styles from "./styles.module.scss";
import { Container, Footer } from "@/client/components";
import { pages } from "@/shared/data";
import { getIsMobile } from "@/shared/utils";

export const LandingPage: FC = async () => {
  const isMobile = await getIsMobile();

  if (isMobile) redirect(pages.login.path);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container className={styles.container}>
          <Hero />
          <Advantages />
          <Achievements />
          <Team />
          <Partners />
        </Container>
      </main>
      <Footer />
    </>
  );
};
