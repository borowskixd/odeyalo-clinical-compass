import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  prevPageHandler: () => void;
  nextPageHandler: () => void;
  disabled: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export const ButtonsContainer: FC<Props> = ({
  prevPageHandler,
  nextPageHandler,
  disabled,
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
          view="primary"
          width="max"
          type="submit"
          disabled={disabled}
        >
          Завершить
        </Button>
      )}
      {!isLastPage && (
        <Button
          view="primary"
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
