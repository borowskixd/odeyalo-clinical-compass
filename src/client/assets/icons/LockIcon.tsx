import { type FC } from "react";
import { type IconProps } from "@/client/assets/icons/types";

export const LockIcon: FC<IconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="3"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="15.5"
        r="1.5"
        fill="white"
      />
    </svg>
  );
};
