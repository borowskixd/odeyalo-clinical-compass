import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { useGetTestQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { type GetTestsResponseData } from "@/shared/types";

interface TestProps {
  test: GetTestsResponseData[number];
  params?: {
    [key: string]: string;
  };
}

export const TestCard: FC<TestProps> = ({ test, params = undefined }) => {
  const { data: testInfo } = useGetTestQuery(test.id);

  const displayTitle = testInfo?.title || test.title;

  return (
    <div className={styles.testCard}>
      <div className={styles.testTitle}>{displayTitle}</div>
      <Link
        className={styles.testLink}
        href={pages.result.getLink({
          params: { id: test.id },
          queryParams: params,
        })}
      >
        Посмотреть результаты
      </Link>
    </div>
  );
};
