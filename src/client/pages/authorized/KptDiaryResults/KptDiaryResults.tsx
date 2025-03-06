import { Form } from "./components";
import styles from "./styles.module.scss";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

const imageUrl = kptDiaryImage.src;

export const KptDiaryResultsPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <div className={styles.main}>
          <div className={styles.pictureContainer}>
            <img
              src={imageUrl}
              className={styles.picture}
            />
          </div>
          <Form />
        </div>
      </ContentWrapper>
    </Container>
  );
};
