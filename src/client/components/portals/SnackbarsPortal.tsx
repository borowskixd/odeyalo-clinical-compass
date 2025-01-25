"use client";

import { SnackbarWithCloseAffordance } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectSnackbar } from "@/client/redux";
import { type FC } from "react";

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
