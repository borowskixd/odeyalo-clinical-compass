import { Header, Result } from "./components";
import styles from "./styles.module.scss";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { ImageContentPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

export const KptDiaryResultPage: FC = () => {
  return (
    <ImageContentPageLayout
      imageSrc={kptDiaryImage.src}
      className={styles.content}
    >
      <Header />
      <Result />
    </ImageContentPageLayout>
  );
};
