"use client";

import { Icons20 } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { getDaysDeclension } from "./utils";
import {
  Button,
  ContentWrapper,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetPraiseQuery } from "@/client/redux";

interface PraiseCardProps {
  onClose?: () => void;
  isVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export const PraiseCard: FC<PraiseCardProps> = ({
  onClose,
  isVisible,
  onVisibleChange,
}) => {
  const { data, isLoading } = useGetPraiseQuery();

  useEffect(() => {
    if (data && data.consecutiveDays === 0 && onVisibleChange) {
      onVisibleChange(false);
    }
  }, [data, onVisibleChange]);

  if (!isVisible) return null;
  if (isLoading || !data) return <LoadingLoop />;
  if (data.consecutiveDays === 0) return null;

  return (
    <ContentWrapper>
      <div className={styles.content}>
        <Button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </Button>
        <div className={styles.smileIcon}>
          <Icons20.FaceSmileIcon />
        </div>
        <PageTitle className={styles.days}>
          {data.consecutiveDays} {getDaysDeclension(data.consecutiveDays)}
        </PageTitle>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.subtitle}>{data.subtitle}</div>
      </div>
    </ContentWrapper>
  );
};
