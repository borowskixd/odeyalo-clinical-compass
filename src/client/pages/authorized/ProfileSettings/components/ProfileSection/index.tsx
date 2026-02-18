import { Icon, Icons20 } from "@odeyalo/uikit";
import { type FC, type ReactNode } from "react";
import { type SectionProps } from "../../types";
import styles from "./styles.module.scss";
import { ContentWrapper, IconButton, PageTitle } from "@/client/components";

interface Props extends SectionProps {
  title: string;
  children?: ReactNode;
}

export const ProfileSection: FC<Props> = ({ title, children, onBack }) => {
  const onClickHandler = () => {
    onBack?.();
  };

  return (
    <ContentWrapper className={styles.section}>
      <div className={styles.header}>
        <IconButton onClick={onClickHandler}>
          <Icon
            data={Icons20.ArrowLeftIcon}
            size={20}
          />
        </IconButton>
        <PageTitle>{title}</PageTitle>
      </div>
      <div className={styles.content}>{children}</div>
    </ContentWrapper>
  );
};
