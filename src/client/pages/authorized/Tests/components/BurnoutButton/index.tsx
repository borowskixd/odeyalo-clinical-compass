"use client";

import { type FC, useState } from "react";
import { BurnoutPopUp } from "../BurnoutPopUp";
import { PrimaryButton } from "@/client/components";

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
