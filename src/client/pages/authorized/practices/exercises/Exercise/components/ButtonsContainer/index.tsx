import styles from "./styles.module.scss";
import { Button } from "odeyalo-uikit";
import { type FC } from "react";

interface Props {
  prevPageHandler: () => void;
  nextPageHandler: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export const ButtonsContainer: FC<Props> = ({
  prevPageHandler,
  nextPageHandler,
  isFirstPage,
  isLastPage,
}) => {
  return (
    <div className={styles.container}>
      {!isFirstPage && (
        <Button
          width="max"
          onClick={prevPageHandler}
          type="button"
        >
          Назад
        </Button>
      )}
      {isLastPage && (
        <Button
          view="action"
          width="max"
          type="submit"
        >
          Завершить
        </Button>
      )}
      {!isLastPage && (
        <Button
          view="action"
          width="max"
          onClick={nextPageHandler}
          type="button"
        >
          Далее
        </Button>
      )}
    </div>
  );
};
