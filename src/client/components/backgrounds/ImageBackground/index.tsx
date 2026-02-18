import { type FC } from "react";
import styles from "./styles.module.scss";
import main from "@/../public/static/backgrounds/main.webp";

interface ImageBackgroundProps {
  src?: string;
}

const DEFAULT_IMAGE_URL = main.src;

export const ImageBackground: FC<ImageBackgroundProps> = ({
  src = DEFAULT_IMAGE_URL,
}) => {
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url("${src}")` }}
    ></div>
  );
};
