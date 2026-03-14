"use client";

import { Button, Popup, Text } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { BurnoutPopUp } from "../BurnoutPopUp";
import styles from "./styles.module.scss";
import { useGetBurnoutCalculateQuery } from "@/client/redux";

export const BurnoutButton: FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const { data: burnout, isLoading, isError } = useGetBurnoutCalculateQuery();
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  const buttonDisabled = isError || isLoading;

  const openPopUp = () => {
    if (buttonDisabled) {
      setOpen((open) => !open);
    } else {
      setIsPopUpOpen(true);
    }
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <>
      <Button
        ref={setButtonRef}
        onClick={openPopUp}
        view="primary"
        size="s"
        width="auto"
      >
        Оценить склонность к выгоранию
      </Button>
      <Popup
        open={open}
        onOpenChange={setOpen}
        anchorElement={buttonRef}
        placement="bottom"
      >
        <div className={styles.popup}>
          <Text variant="body-m-bold">
            Для оценки склонности к выгоранию пройдите тест &#34;Что мне
            свойственно?&#34;
          </Text>
        </div>
      </Popup>

      {!buttonDisabled && isPopUpOpen && (
        <BurnoutPopUp
          onClose={closePopUp}
          result={burnout?.result ?? 0}
        />
      )}
    </>
  );
};
