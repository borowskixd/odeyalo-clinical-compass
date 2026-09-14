"use client";

import { type FC } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./styles.module.scss";
import { mapMoodsToWeeklyChartData } from "./utils";
import { LoadingLoop } from "@/client/components";
import { useGetWeeklyMoodsQuery } from "@/client/redux";

export const MoodChart: FC = () => {
  const { data, isLoading, error } = useGetWeeklyMoodsQuery();

  if (isLoading) {
    return <LoadingLoop />;
  }

  if (error) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.emptyState}>
          Ошибка загрузки данных о настроении
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.emptyState}>Нет данных о настроении</div>
      </div>
    );
  }

  const chartData = mapMoodsToWeeklyChartData(data).slice(-7);

  if (chartData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.emptyState}>Нет данных для отображения</div>
      </div>
    );
  }

  const maxScore = Math.max(...chartData.map((item) => item.score), 100);
  const yAxisDomain = [0, Math.ceil(maxScore / 10) * 10];

  return (
    <div>
      <p className={styles.title}>График настроения</p>
      <div className={styles.chartContainer}>
        <div className={styles.chartContent}>
          <div className={styles.chartY}>
            <div>{yAxisDomain[1]}</div>
            <div>{yAxisDomain[1] / 2}</div>
            <div>0</div>
          </div>
          <ResponsiveContainer className={styles.chart}>
            <AreaChart
              data={chartData}
              margin={{ right: 4, left: 4, top: 4, bottom: 4 }}
            >
              {[0, 2, 4].map((entry, index) => (
                <ReferenceLine
                  key={index}
                  y={entry * (yAxisDomain[1] / 4)}
                  stroke="#fff"
                  strokeWidth={2}
                  ifOverflow="extendDomain"
                />
              ))}
              <XAxis
                dataKey="day"
                hide={true}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                hide={true}
                domain={[0, yAxisDomain[1]]}
              />
              <Area
                isAnimationActive={false}
                type="linear"
                dataKey="score"
                strokeWidth={0}
                fill="#0C2A9F"
                fillOpacity={0.3}
              />
              {chartData.map((entry, index) => (
                <ReferenceLine
                  key={`guide-line-${index}`}
                  segment={[
                    { x: entry.day, y: 0 },
                    { x: entry.day, y: entry.score },
                  ]}
                  stroke="#97ACFF"
                  strokeWidth={2}
                />
              ))}
              <Area
                isAnimationActive={false}
                type="linear"
                dataKey="score"
                stroke="#3555D4"
                strokeWidth={4}
                fill="#0C2A9F"
                fillOpacity={0}
                dot={{ fill: "#0C2A9F", r: 4, stroke: "none", fillOpacity: 1 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartX}>
          {chartData.map((el, index) => (
            <div key={el.day + el.score + index}>{el.day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
