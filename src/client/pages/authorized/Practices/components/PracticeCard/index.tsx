import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { pages } from "@/shared/data";
import { type FC } from "react";

interface Props {
  title: string;
  src: string;
}

export const PracticeCard: FC<Props> = ({ src, title }) => {
  return (
    <Link
      href={pages.problemDefinition.path}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <Image
          width={260}
          height={165}
          src={src}
          alt={title}
          className={styles.image}
        />
      </div>
      <h5 className={styles.title}>{title}</h5>
    </Link>
  );
};
