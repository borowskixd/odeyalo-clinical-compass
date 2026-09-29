import { FC } from "react";
import styles from "./styles.module.scss";
import { Reference, references } from "./utils";

interface TextLinksProps {
  items?: Reference[];
}

export const TextLinks: FC<TextLinksProps> = ({ items = references }) => {
  return (
    <ul className={styles.textLinks}>
      {items.map((ref) => (
        <li
          key={ref.id}
          className={styles.textLinks__item}
        >
          <span>{ref.authors} </span>
          <span>{ref.title}</span>
          <span>
            {"// "}
            {ref.journal}. –{" "}
          </span>
          <span>{ref.year}. – </span>
          {ref.volume && <span>{ref.volume}</span>}
          {ref.issue && <span>, {ref.issue}</span>}
          {(ref.volume || ref.issue) && <span>. – </span>}
          <span>{ref.pages}.</span>
        </li>
      ))}
    </ul>
  );
};
