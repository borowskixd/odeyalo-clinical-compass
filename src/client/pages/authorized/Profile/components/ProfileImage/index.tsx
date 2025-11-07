import styles from "./styles.module.scss";
import { Icon, Icons20 } from "@odeyalo/uikit";
import { type FC } from "react";

export const ProfileImage: FC = () => {
  return (
    <div className={styles.imageContainer}>
      <Icon
        data={Icons20.PhotoIcon}
        size={48}
      />
    </div>
  );
};
