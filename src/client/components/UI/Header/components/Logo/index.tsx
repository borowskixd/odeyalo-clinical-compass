import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { LogoIcon } from "@/client/assets/icons";
import { pages } from "@/shared/data";
import { getIsMobile } from "@/shared/utils";

export const Logo: FC = async () => {
  const isMobile = await getIsMobile();

  return (
    <Link
      href={isMobile ? pages.login.path : pages.main.path}
      className={styles.logo}
    >
      <LogoIcon />
    </Link>
  );
};
