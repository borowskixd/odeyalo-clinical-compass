"use client";

import { Button } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { useGetHelpCategoryByIdQuery } from "@/client/redux";
import { getDailyTaskLink, getDailyTaskType } from "@/shared/utils";

interface ModalProps {
  categoryId: string;
  onClose: () => void;
}

export const HelpCategoryModal: FC<ModalProps> = ({ categoryId, onClose }) => {
  const { data: category } = useGetHelpCategoryByIdQuery(categoryId);

  if (!category) return null;

  const getMaterialLink = (type: string, materialId: string) => {
    if (type === "theory") {
      return `/articles/${materialId}`;
    }

    const taskType = getDailyTaskType(type as "practice" | "test");
    return getDailyTaskLink(taskType, materialId) ?? "#";
  };

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

            if (material.type === "test") tag = "Тест";
            else if (material.type === "practice") tag = "Практика";
            else if (material.type === "theory") tag = "Теория";

            const href = getMaterialLink(material.type, material.materialId);

            return (
              <div
                key={material.materialId}
                className={styles.materialItem}
              >
                <Link
                  href={href}
                  className={styles.materialCard}
                >
                  <div className={styles.materialImageContainer}>
                    <img
                      src={material.imageUrl}
                      alt={material.title}
                      className={styles.materialImage}
                    />
                  </div>
                  <p className={styles.materialTag}>{tag}</p>
                </Link>
                {material.title && (
                  <div className={styles.materialTitle}>{material.title}</div>
                )}
              </div>
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
