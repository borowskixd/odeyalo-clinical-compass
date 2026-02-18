import { type FC } from "react";
import { type IconProps } from "@/client/assets/icons/types";

export const ArrowIcon: FC<IconProps> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 3L13.1274 9.03533C13.5893 9.42642 13.6006 10.1349 13.1515 10.5406L6 17"
        stroke="#2E628C"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
