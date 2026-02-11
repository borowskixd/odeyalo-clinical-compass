import styles from "./styles.module.scss";
import { achievements } from "@/shared/data";
import { type FC } from "react";

export const Achievements: FC = () => {
  return (
    <section id="landing-achievements" className={styles.achievementsSection}>
      <h3 className={styles.title}>Достижения</h3>
      <div className={styles.achievements}>
        {achievements.slice(0, 4).map((el, i) => {
          return (
            <div
              className={`${styles.achievementCard} ${styles["achievementCard" + (i + 1)]}`}
              key={i}
            >
              <h4 className={styles.achievementTitle}>{el.title}</h4>
              {el.description && (
                <p className={styles.achievementDescription}>{el.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
