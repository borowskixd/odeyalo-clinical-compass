import { Text } from "@odeyalo/uikit";
import type { ComponentProps, ElementType } from "react";
import styles from "./styles.module.scss";

type BaseProps<C extends ElementType> = {
  hint?: boolean;
  hintText?: string;
  labelText?: string;
  component: C;
};

type Props<C extends ElementType> = BaseProps<C> &
  Omit<ComponentProps<C>, keyof BaseProps<C>>;

export const ExerciseStructure = <C extends ElementType>({
  hint = true,
  hintText,
  labelText,
  component,
  ...props
}: Props<C>) => {
  const hintVisible = hint && !!hintText;

  const Component = component;

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {labelText && (
          <Text
            variant="title-xs"
            className={styles.labelText}
          >
            {labelText}
          </Text>
        )}
        <Component {...(props as ComponentProps<C>)} />
      </label>
      {hintVisible && <p className={styles.hint}>{hintText}</p>}
    </div>
  );
};
