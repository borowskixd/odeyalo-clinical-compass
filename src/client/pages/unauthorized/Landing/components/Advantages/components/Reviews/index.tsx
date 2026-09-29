import { type FC } from "react";
import styles from "./styles.module.scss";
import { reviewBlocks, title } from "./utils";

export const Reviews: FC = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ backgroundImage: 'url("/static/landing/roman.webp")' }}
      />
      <div className={styles.textContent}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.blocks}>
          {reviewBlocks.map((block) => (
            <div
              key={block.id}
              className={styles.block}
            >
              {block.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
