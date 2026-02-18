"use client";

import { type FC } from "react";
import { useAppSelector } from "@/client/hooks";
import { selectIsMobile } from "@/client/redux";

interface ResponsiveProps {
  [key: string]: any;
}

export const withResponsive = <T extends ResponsiveProps>(
  Mobile: FC<T>,
  Desktop: FC<T>,
) => {
  const ResponsiveComponent: FC<T> = (props) => {
    const isMobile = useAppSelector(selectIsMobile);

    return isMobile ? <Mobile {...props} /> : <Desktop {...props} />;
  };

  return ResponsiveComponent;
};
