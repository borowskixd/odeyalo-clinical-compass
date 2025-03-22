import styles from "./styles.module.scss";
import Image from "next/image";
import { Container, ContentWrapper } from "@/client/components";
import { type FC, type ReactNode } from "react";

interface Props {
  imageSrc: string;
  children: ReactNode;
}

export const ImageContentPageLayout: FC<Props> = ({ imageSrc, children }) => {
  return (
    <Container>
      <ContentWrapper>
        <div className={styles.main}>
          <div className={styles.pictureContainer}>
            <Image
              src={imageSrc}
              alt={""}
              className={styles.picture}
              width={536}
              height={460}
            />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
