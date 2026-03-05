import { Text } from "@odeyalo/uikit";
import cl from "classnames";
import { forwardRef } from "react";
import styles from "./styles.module.scss";
import { type Message as MessageType } from "@/shared/types";

type MessageProps = MessageType;

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, author }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(styles.message, author === "user" ? styles.user : null)}
      >
        <Text>{message}</Text>
      </div>
    );
  },
);

Message.displayName = "Message";
