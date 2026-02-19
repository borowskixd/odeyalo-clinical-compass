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
import { mapApiDataToWeeklyChartData } from "./utils";
import { LoadingLoop } from "@/client/components";
import { useGetWeeklyGamificationScoreQuery } from "@/client/redux";

export const WeeklyChart: FC = () => {
  const { data, isLoading } = useGetWeeklyGamificationScoreQuery();

  if (isLoading || !data) return <LoadingLoop />;

  const chartData = mapApiDataToWeeklyChartData(data);

  return (
    <div>
      <div className={styles.chartContainer}>
        <div className={styles.chartContent}>
          <div className={styles.chartY}>
            <div>40</div>
            <div>20</div>
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
                  y={entry * 10}
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
                domain={[0, 40]}
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
          {chartData.map((el) => (
            <div key={el.day}>{el.day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
