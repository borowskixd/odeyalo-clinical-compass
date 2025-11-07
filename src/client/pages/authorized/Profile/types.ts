import type { IconProps } from "@odeyalo/uikit";
import type { FC } from "react";

export type SectionProps = {
  onBack?: () => void;
};

export type SectionComponent = FC<SectionProps>;

export type NavigationButton = {
  key: string;
  title: string;
  icon: IconProps["data"];
  component: SectionComponent;
  active: boolean;
};
