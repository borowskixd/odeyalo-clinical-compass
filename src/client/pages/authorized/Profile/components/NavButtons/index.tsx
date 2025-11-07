import styles from "./styles.module.scss";
import { Button, Icon, type IconProps } from "@odeyalo/uikit";
import { type FC, type ReactNode } from "react";

type Button = {
  key: string;
  title: string;
  icon: IconProps["data"];
  component: ReactNode;
  active: boolean;
};

interface Props {
  buttons: Button[];
  onClick?: (component: ReactNode, key: string) => void;
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
          onClick={() => onClick?.(button.component, button.key)}
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
