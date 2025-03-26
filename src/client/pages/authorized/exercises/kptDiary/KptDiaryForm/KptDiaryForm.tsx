"use client";

import { Form, Header } from "./components";
import styles from "./styles.module.scss";
import kptDiaryImage from "@/client/assets/webp/pictures/kptDiaryImage.webp";
import { ImageContentPageLayout } from "@/client/components/layouts";
import { type FC, useState } from "react";

export const KptDiaryFormPage: FC = () => {
  const [hint, setHint] = useState(false);

  const toggleHint = () => {
    setHint(!hint);
  };

  return (
    <ImageContentPageLayout
      imageSrc={kptDiaryImage.src}
      className={styles.content}
    >
      <Header
        hint={hint}
        toggleHintAction={toggleHint}
      />
      <Form hint={hint} />
    </ImageContentPageLayout>
  );
};
