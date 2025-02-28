import { Form } from "./components";
import styles from "./styles.module.scss";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

const imageUrl = kptDiaryImage.src;

export const KptDiaryFormPage: FC = () => {
  return (
    <Container>
      <ContentWrapper className={styles.wrapper}>
        <div className={styles.main}>
          <section>
            <img
              src={imageUrl}
              className={styles.picture}
            />
          </section>
          <Form></Form>
        </div>
      </ContentWrapper>
    </Container>
  );
};
