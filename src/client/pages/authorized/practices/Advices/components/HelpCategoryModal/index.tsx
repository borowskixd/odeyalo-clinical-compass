"use client";

import { Button } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { LoadingLoop } from "@/client/components";
import { useGetHelpCategoryByIdQuery } from "@/client/redux";

interface ModalProps {
  categoryId: string;
  onClose: () => void;
}

export const HelpCategoryModal: FC<ModalProps> = ({ categoryId, onClose }) => {
  const { data: category, isLoading } = useGetHelpCategoryByIdQuery(categoryId);

  if (isLoading) return <LoadingLoop />;
  if (!category) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.modalTitle}>{category.title}</h3>

        <div className={styles.materialsList}>
          {category.materials.map((material) => {
            let tag = "Материал";
            let href = "#";

            if (material.type === "test") {
              tag = "Тест";
              href = `/tests/${material.materialId}`;
            } else if (material.type === "practice") {
              tag = "Практика";
              href = `/practices/${material.materialId}`;
            } else if (material.type === "theory") {
              tag = "Теория";
              href = `/theory/${material.materialId}`;
            }

            return (
              <Link
                key={material.materialId}
                href={href}
                className={styles.materialCard}
              >
                <span className={styles.materialTag}>{tag}</span>
                <span className={styles.materialLink}>Перейти</span>
              </Link>
            );
          })}
        </div>

        <Button
          type="button"
          width="max"
          view="secondary"
          onClick={onClose}
          className={styles.closeButton}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};
