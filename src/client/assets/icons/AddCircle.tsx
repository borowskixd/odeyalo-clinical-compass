import { type IconProps } from "@/client/assets/icons/types";
import { type FC } from "react";

export const AddCircle: FC<IconProps> = (props) => {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM21.25 16.25H16.25V21.25H13.75V16.25H8.75V13.75H13.75V8.75H16.25V13.75H21.25V16.25Z"
        fill="#3555D4"
      />
    </svg>
  );
};
