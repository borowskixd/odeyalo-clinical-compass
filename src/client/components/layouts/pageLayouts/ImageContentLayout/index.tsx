import styles from "./styles.module.scss";
import { Container, ContentWrapper } from "@/client/components";
import { type FC, type ReactNode } from "react";

interface Props {
  imageSrc: string;
  children: ReactNode;
}

export const ImageContentLayout: FC<Props> = ({ imageSrc, children }) => {
  return (
    <Container>
      <ContentWrapper>
        <div className={styles.main}>
          <div className={styles.pictureContainer}>
            <img
              src={imageSrc}
              className={styles.picture}
            />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
