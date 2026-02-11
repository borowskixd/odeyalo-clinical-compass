import { Addition, Step } from "./components";
import styles from "./styles.module.scss";
import { type FC } from "react";

export const Advantages: FC = () => {
  return (
    <>
      <section
        id="landing-advantages"
        className={styles.infoSection}
      >
        <div className={styles.textSide}>
          <h2 className={`${styles.title}`}>Как работает сервис?</h2>
          <ul className={styles.infoList}>
            <li className={`${styles.infoListItem} ${styles.infoListItem1}`}>
              <Step number={1} />
              <div className={styles.listItemContent}>
                <span>
                  Знакомство с основами самопомощи и принципами
                  когнитивно-поведенческой терапии (КПТ)
                </span>
              </div>
            </li>
            <li className={`${styles.infoListItem}`}>
              <Step number={2} />
              <div className={styles.listItemContent}>
                Уточнение своего запроса: <br />
                - прохождение тестов, <br />
                - получение рекомендаций, <br />
                - определение целей работы <br />
              </div>
            </li>
            <li className={`${styles.infoListItem}`}>
              <Step number={3} />
              <div className={styles.listItemContent}>
                Работа с иррациональными мыслями, <br />
                формирование и закрепление <br />
                альтернативных убеждений
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.imageSide}>
          <div
            className={styles.phoneImage}
            style={{
              backgroundImage: 'url("/static/landing/phone-screen.webp")',
            }}
          />
        </div>
      </section>
      <Addition></Addition>
    </>
  );
};
