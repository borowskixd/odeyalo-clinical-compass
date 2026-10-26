"use client";

import { Modal } from "@odeyalo/uikit";
import { type FC } from "react";
import { NumberInputStep, QuestionStep, ResultStep } from "./components";
import { useSchemeNavigation } from "./utils";

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicationModal: FC<MedicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    currentNode,
    currentId,
    numberValues,
    canGoBack,
    goTo,
    goBack,
    submitNumber,
    reset,
  } = useSchemeNavigation();

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) handleClose();
      }}
      title="Подбор рекомендаций по лечению"
    >
      {currentNode.type === "question" && (
        <QuestionStep
          question={currentNode}
          onSelect={goTo}
          onBack={canGoBack ? goBack : undefined}
        />
      )}
      {currentNode.type === "number-input" && (
        <NumberInputStep
          node={currentNode}
          initialValue={numberValues[currentId]}
          onSubmit={submitNumber}
          onBack={canGoBack ? goBack : undefined}
        />
      )}
      {currentNode.type === "result" && (
        <ResultStep
          result={currentNode}
          onRestart={reset}
          onClose={handleClose}
        />
      )}
    </Modal>
  );
};
