"use client";

import { type FC } from "react";
import { SnackbarWithCloseAffordance } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectSnackbar } from "@/client/redux";

export const SnackbarsPortal: FC = () => {
  const snackbar = useAppSelector(selectSnackbar);

  return (
    <div id="snackbars">
      <SnackbarWithCloseAffordance
        isOpen={snackbar.isOpen}
        label={snackbar.label}
      />
    </div>
  );
};
