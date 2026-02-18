"use client";

import { type FC, useMemo } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import styles from "./styles.module.scss";
import { mapToBarChartData } from "@/client/utils";
import { type GetTestResponseData, type TestResultData } from "@/shared/types";

interface Props {
  results: TestResultData[];
  scales: GetTestResponseData["scales"];
  values: string[];
  className?: string;
}

export const SimpleBarChart: FC<Props> = ({
  results,
  scales,
  values,
  className = "",
}) => {
  const barData = useMemo(() => {
    if (!results || !scales) return { data: [], bars: [] };

    return mapToBarChartData(results, scales, values);
  }, [results, scales, values]);

  const primaryColor = "#2E628C";
  const secondaryColor = "#9BCBFA";

  return (
    <ResponsiveContainer className={`${styles.chartContainer} ${className}`}>
      <BarChart
        maxBarSize={100}
        width={500}
        height={300}
        data={barData.data}
      >
        <XAxis dataKey="name" />
        <Legend />
        <Tooltip
          labelClassName={styles.tooltipLabel}
          cursor={{ className: styles.tooltipCursor }}
          wrapperClassName={styles.tooltipWrapper}
        />
        {barData.bars.map((el, index) => {
          return (
            <Bar
              key={el.dataKey}
              dataKey={el.dataKey}
              name={el.name}
              fill={index % 2 === 0 ? primaryColor : secondaryColor}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};
