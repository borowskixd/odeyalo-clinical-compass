import styles from "./styles.module.scss";
import {
  Container,
  Header,
  PageTitle,
  PrimaryButton,
} from "@/client/components";
import { type FC } from "react";

interface UnexpectedPageProps {
  reset: () => void;
}

export const UnexpectedPage: FC<UnexpectedPageProps> = ({ reset }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <PageTitle className={styles.title}>Непредвиденная ошибка</PageTitle>
          <PrimaryButton onClick={reset}>Попробовать снова</PrimaryButton>
        </Container>
      </main>
    </>
  );
};
