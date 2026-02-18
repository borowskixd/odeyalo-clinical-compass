"use client";

import Link from "next/link";
import { type FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { LogoIcon } from "@/client/assets/icons";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";

export const Logo: FC = () => {
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("landing-page-opened");
  }, [logEvent]);

  return (
    <Link
      href={pages.main.path}
      className={styles.logo}
    >
      <LogoIcon />
    </Link>
  );
};
