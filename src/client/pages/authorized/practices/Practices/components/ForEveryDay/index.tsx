import { type FC } from "react";
import styles from "./styles.module.scss";
import { ArrowForward } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { pages } from "@/shared/data";

export const ForEveryDay: FC = () => {
  return (
    <section>
      <h3 className={styles.title}>На каждый день</h3>
      {/*<a*/}
      {/*  href={pages.kptDiary.path}*/}
      {/*  className={styles.kptDiary}*/}
      {/*>*/}
      {/*  <div className={styles.imageContainer}>*/}
      {/*    <Image*/}
      {/*      src={practiceKptDiaryImage.src}*/}
      {/*      alt={"КПТ-дневник"}*/}
      {/*      className={styles.image}*/}
      {/*      width={536}*/}
      {/*      height={400}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <h5 className={styles.practiceTitle}>КПТ-дневник</h5>*/}
      {/*</a>*/}
      <Button
        href={pages.notes.path}
        className={styles.button}
      >
        Дневник эмоций <ArrowForward />
      </Button>
    </section>
  );
};
