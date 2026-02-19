import { Text } from "@odeyalo/uikit";
import type { ComponentProps, ElementType } from "react";
import styles from "./styles.module.scss";

type BaseProps<C extends ElementType> = {
  hint?: boolean;
  hintText?: string;
  labelText?: string;
  sectionIndex?: number;
  component: C;
};

type Props<C extends ElementType> = BaseProps<C> &
  Omit<ComponentProps<C>, keyof BaseProps<C>>;

export const ExerciseStructure = <C extends ElementType>({
  hint = true,
  hintText,
  labelText,
  component,
  sectionIndex,
  ...props
}: Props<C>) => {
  const hintVisible = hint && !!hintText;

  const Component = component;

  const hasSectionIndex = typeof sectionIndex === "number";

  const exerciseStructureStyle = hasSectionIndex
    ? {
        ["--grid-area-title" as any]: `title${sectionIndex}`,
        ["--grid-area-field" as any]: `field${sectionIndex}`,
        ["--grid-area-hint" as any]: `hint${sectionIndex}`,
      }
    : {};

  return (
    <div
      className={styles.container}
      style={{ ...exerciseStructureStyle }}
    >
      <label className={styles.label}>
        {!!labelText && (
          <Text
            variant="title-xs"
            className={styles.labelTitle}
          >
            {labelText}
          </Text>
        )}
        <div className={styles.field}>
          <Component {...(props as ComponentProps<C>)} />
        </div>
      </label>
      <p className={styles.hint}>{hintVisible && hintText}</p>
    </div>
  );
};
