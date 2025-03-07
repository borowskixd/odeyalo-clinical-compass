import styles from "./styles.module.scss";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { Container, ContentWrapper } from "@/client/components";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  imageUrl?: string;
}

export const ExercisePageLayout: FC<Props> = ({ imageUrl, children }) => {
  return (
    <Container>
      <ContentWrapper>
        <div className={styles.main}>
          <div className={styles.pictureContainer}>
            <img
              src={imageUrl ?? kptDiaryImage.src}
              className={styles.picture}
            />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
