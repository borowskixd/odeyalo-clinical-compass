import styles from "./styles.module.scss";
import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import { PracticeCard } from "@/client/pages/authorized/Practices/components/PracticeCard";
import { type FC } from "react";

export const Practices: FC = () => {
  return (
    <section>
      <h3 className={styles.title}>Проработка проблемы</h3>
      <div className={styles.list}>
        <PracticeCard
          title={"Определение групп (категорий) проблем"}
          src={problemDefinition.src}
        />
      </div>
    </section>
  );
};
