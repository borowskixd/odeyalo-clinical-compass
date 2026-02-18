import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";
import { Container, ContentWrapper } from "@/client/components";

interface Props {
  imageSrc: string;
  children: ReactNode;
  className?: string;
}

export const ImageWrapper: FC<Props> = ({
  imageSrc,
  children,
  className = "",
}) => {
  return (
    <Container>
      <ContentWrapper>
        <div className={styles.main}>
          <div className={styles.pictureContainer}>
            <img
              src={imageSrc}
              alt={""}
              className={styles.picture}
            />
          </div>
          <div className={className}>{children}</div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
