import styles from "./styles.module.scss";
import { ArrowForward } from "@/client/assets/icons";
import practiceKptDiaryImage from "@/client/assets/webp/pictures/practiceKptDiary.webp";
import { Button } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ForEveryDay: FC = () => {
  return (
    <section>
      <h3 className={styles.title}>На каждый день</h3>
      <a
        href={pages.kptDiary.path}
        className={styles.kptDiary}
      >
        <div className={styles.imageContainer}>
          <img
            src={practiceKptDiaryImage.src}
            className={styles.image}
          />
        </div>
        <h5 className={styles.practiceTitle}>КПТ-дневник</h5>
      </a>
      <Button
        href={pages.notes.path}
        className={styles.button}
      >
        Заметки <ArrowForward />
      </Button>
    </section>
  );
};
