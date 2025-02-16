import styles from "./styles.module.scss";
import { ArrowForward } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ForEveryDay: FC = () => {
  return (
    <section>
      <h3 className={styles.title}>На каждый день</h3>
      <Button
        href={pages.notes.path}
        className={styles.button}
      >
        Заметки <ArrowForward />
      </Button>
    </section>
  );
};
