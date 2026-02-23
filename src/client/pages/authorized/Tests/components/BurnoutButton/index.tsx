"use client";

import { type FC, useState } from "react";
import { PrimaryButton } from "@/client/components";
import { BurnoutPopUp } from "../BurnoutPopUp";

export const BurnoutButton: FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <>
      <PrimaryButton onClick={openPopUp}>
        Оценить склонность к выгоранию
      </PrimaryButton>

      {isPopUpOpen && <BurnoutPopUp onClose={closePopUp} />}
    </>
  );
};
