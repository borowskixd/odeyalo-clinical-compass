"use client";

import { Button, Icon } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { ArrowForward } from "@/client/assets/icons";
import { pages } from "@/shared/data";

export const ForEveryDay: FC = () => {
  return (
    <section>
      <h3 className={styles.title}>На каждый день</h3>
      <div className={styles.buttons}>
        <Button
          size="xl"
          view="primary"
          width="max"
          align="left"
          href={pages.notes.path}
        >
          Дневник эмоций
          <Icon
            data={ArrowForward}
            size={24}
          />
        </Button>
        <Button
          size="xl"
          view="primary"
          width="max"
          align="left"
          href={pages.squareBreathing.path}
        >
          Дыхание по квадрату
          <Icon
            data={ArrowForward}
            size={24}
          />
        </Button>
      </div>
    </section>
  );
};
