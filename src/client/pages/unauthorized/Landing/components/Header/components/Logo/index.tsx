"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { LogoIcon } from "@/client/assets/icons";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

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
