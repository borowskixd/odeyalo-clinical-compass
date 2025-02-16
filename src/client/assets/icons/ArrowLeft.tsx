import type { IconProps } from "@/client/assets/icons/types";
import { type FC } from "react";

export const ArrowLeft: FC<IconProps> = (props) => {
  return (
    <svg
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.6667 9.33301L13 15.9997L19.6667 22.6663V9.33301Z"
        fill="#1C1A1A"
      />
    </svg>
  );
};
