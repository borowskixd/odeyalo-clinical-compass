"use client";

import { Button, Icon, Icons20, Icons24Solid } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { getDaysDeclension } from "./utils";
import { ContentWrapper, LoadingLoop, PageTitle } from "@/client/components";
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
  if (!data || data.consecutiveDays === 0) return null;

  const renderContent = () => {
    if (isLoading) return <LoadingLoop />;

    return (
      <>
        <div className={styles.smileIcon}>
          <Icon
            data={Icons20.FaceSmileIcon}
            size={80}
          />
        </div>
        <PageTitle className={styles.days}>
          {data.consecutiveDays} {getDaysDeclension(data.consecutiveDays)}
        </PageTitle>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.subtitle}>{data.subtitle}</div>
      </>
    );
  };

  return (
    <ContentWrapper>
      <div className={styles.content}>
        <Button
          shape="circle"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Icon
            data={Icons24Solid.XMarkIcon}
            size={24}
          />
        </Button>
        {renderContent()}
      </div>
    </ContentWrapper>
  );
};
