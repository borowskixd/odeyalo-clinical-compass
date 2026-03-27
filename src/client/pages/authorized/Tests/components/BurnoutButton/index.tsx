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

  const TEST_ID = "e89f7acb-cd31-4d27-aadd-24f6c7d52794";

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

  const handleNavigateToTest = () => {
    setOpen(false);
    window.location.href = `/tests/${TEST_ID}`;
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
          <Button onClick={handleNavigateToTest}>Перейти к прохождению</Button>
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
