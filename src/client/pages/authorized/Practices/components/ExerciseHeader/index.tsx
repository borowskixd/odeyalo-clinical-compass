import styles from "./styles.module.scss";
import { Text } from "odeyalo-uikit";
import { PageTitle } from "@/client/components";
import { type FC, type ReactNode } from "react";

interface Props {
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
}

export const ExerciseHeader: FC<Props> = ({ title, description, action }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <PageTitle>{title}</PageTitle>
        <Text
          as="p"
          variant="body-l"
        >
          {description}
        </Text>
      </div>
      <div className={styles.action}>{action}</div>
    </div>
  );
};
