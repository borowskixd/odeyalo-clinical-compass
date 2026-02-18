import Image from "next/image";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { DefaultAvatar } from "@/client/assets/icons";

interface Props {
  src: string;
  alt: string;
  size: number;
  className?: string;
  [key: string]: any;
}

export const ProfileImage: FC<Props> = ({
  src,
  alt,
  size,
  className = "",
  ...props
}) => {
  return (
    <>
      {src === "" ? (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            minWidth: `${size}px`,
          }}
          className={`${styles.svgContainer} ${className}`}
        >
          <DefaultAvatar />
        </div>
      ) : (
        <Image
          width={size}
          height={size}
          className={`${styles.image} ${className}`}
          src={src}
          alt={alt}
          {...props}
        />
      )}
    </>
  );
};
