import {
  Achievements,
  Advantages,
  Header,
  Hero,
  Partners,
  Team,
} from "./components";
import styles from "./styles.module.scss";
import { redirect } from "next/navigation";
import { Container, Footer } from "@/client/components";
import { pages } from "@/shared/data";
import { getIsMobile } from "@/shared/utils";
import { type FC } from "react";

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
