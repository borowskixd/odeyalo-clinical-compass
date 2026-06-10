"use client";

import { Button, Icon, Icons24Solid } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { Container } from "@/client/components";

interface CompletionScreenProps {
  onClose: () => void;
}

const AchievementIllustration: FC = () => {
  return (
    <svg
      width="457"
      height="498"
      viewBox="0 0 457 498"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M213.86 176.556C68.5512 218.523 30.8789 249.876 2.77047 273.786L152.771 493.373C153.831 494.925 155.798 495.576 157.575 494.963L333.025 434.407M2.77047 273.786L196.729 194.383M366.717 413.193L364.62 424.46C364.62 424.46 355.821 439.031 345.889 438.639C340.927 438.443 333.025 434.407 333.025 434.407M333.025 434.407L196.729 194.383M345.889 438.639L209.142 192.276M364.62 424.46L230.943 175.773M257.556 106.248C273.218 83.4568 301.937 47.3155 301.937 47.3155L342.685 3.71311L453.795 254.142C454.462 255.646 454.38 257.377 453.573 258.812L366.717 413.193M366.717 413.193L232.773 162.239M342.685 3.71311L232.773 162.239M257.556 106.248C238.73 132.108 213.86 176.556 213.86 176.556M257.556 106.248L213.86 176.556M213.86 176.556L196.729 194.383M213.86 176.556L232.773 162.239M232.773 162.239L230.943 175.773M196.729 194.383L209.142 192.276M209.142 192.276L230.943 175.773"
        stroke="#EBEEFF"
        stroke-width="4.15593"
      />
    </svg>
  );
};

export const CompletionScreen: FC<CompletionScreenProps> = ({ onClose }) => {
  return (
    <Container>
      <section
        className={styles.screen}
        aria-labelledby="training-completion-title"
      >
        <Button
          className={styles.closeButton}
          view="default"
          shape="circle"
          size="m"
          onClick={onClose}
          aria-label="Вернуться к списку упражнений"
        >
          <Icon
            data={Icons24Solid.XMarkIcon}
            size={24}
          />
        </Button>

        <div className={styles.points}>+ 10 баллов</div>

        <div className={styles.illustration}>
          <AchievementIllustration />
        </div>

        <div className={styles.copy}>
          <h1
            id="training-completion-title"
            className={styles.title}
          >
            Вы освоили новые навыки
          </h1>
          <p className={styles.subtitle}>Так держать!</p>
        </div>

        <Button
          className={styles.homeButton}
          view="primary"
          shape="circle"
          width="max"
          size="l"
          onClick={onClose}
        >
          На главную
        </Button>
      </section>
    </Container>
  );
};
