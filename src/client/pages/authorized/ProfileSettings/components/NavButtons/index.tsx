import { type NavigationButton } from "../../types";
import styles from "./styles.module.scss";
import { Button, Icon } from "@odeyalo/uikit";
import { type FC } from "react";

interface Props {
  buttons: NavigationButton[];
  onClick?: (key: string) => void;
}

export const NavButtons: FC<Props> = ({ buttons, onClick }) => {
  return (
    <div className={styles.buttons}>
      {buttons.map((button) => (
        <Button
          className={button.active ? styles.active : ""}
          key={button.key}
          size="l"
          width="max"
          align="left"
          onClick={() => onClick?.(button.key)}
        >
          <Icon
            data={button.icon}
            size={20}
          />
          {button.title}
        </Button>
      ))}
    </div>
  );
};
