"use client";

import { Button, Icon, Icons24Solid } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";
import { type GetPsychologistAlertsResponseData } from "@/shared/types";

interface AlertsCardProps {
  alert: GetPsychologistAlertsResponseData[number];
  onClose?: (testResultId: string) => void;
}

export const AlertsCard: FC<AlertsCardProps> = ({ alert, onClose }) => {
  const { clientName, testTitle, testResultId } = alert;

  return (
    <div className={styles.alertsCard}>
      <Button
        shape="circle"
        className={styles.closeButton}
        onClick={() => onClose?.(testResultId)}
        aria-label="Закрыть"
      >
        <Icon
          data={Icons24Solid.XMarkIcon}
          size={24}
        />
      </Button>

      <div className={styles.header}>
        <div className={styles.headerTitle}>ТРЕБУЕТСЯ</div>
        <div className={styles.headerTitle}>ВМЕШАТЕЛЬСТВО</div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyText}>
          У пользователя <span className={styles.bodyAccent}>{clientName}</span>
        </div>
        <div className={styles.bodyText}>повышенные результаты теста</div>
        <div className={`${styles.bodyText}`}>{testTitle}</div>
      </div>

      <Link
        className={styles.resultsLink}
        href={pages.detailResult.getLink({ params: { id: testResultId } })}
      >
        Результаты
      </Link>
    </div>
  );
};
