import styles from "./styles.module.scss";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { LoadingLoop } from "@/client/components";
import { useGetWeeklyGamificationScoreQuery } from "@/client/redux";
import { type FC } from "react";

const chartData = [
  {
    name: "ПН",
    line: 40,
  },
  {
    name: "ВТ",
    line: 20,
  },
  {
    name: "СР",
    line: 40,
  },
  {
    name: "ЧТ",
    line: 10,
  },
  {
    name: "ПТ",
    line: 40,
  },
  {
    name: "СБ",
    line: 40,
  },
  {
    name: "ВС",
    line: 10,
  },
];

export const WeeklyChart: FC = () => {
  const { data, isLoading } = useGetWeeklyGamificationScoreQuery();

  if (isLoading || !data) return <LoadingLoop />;

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
              margin={{ right: 4, left: 4, top: 4 }}
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
                dataKey="name"
                hide={true}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis hide={true} />
              <Area
                isAnimationActive={false}
                type="linear"
                dataKey="line"
                strokeWidth={0}
                fill="#0C2A9F"
                fillOpacity={0.3}
              />
              {chartData.map((entry, index) => (
                <ReferenceLine
                  key={`guide-line-${index}`}
                  segment={[
                    { x: entry.name, y: 0 },
                    { x: entry.name, y: entry.line },
                  ]}
                  stroke="#97ACFF"
                  strokeWidth={2}
                />
              ))}
              <Area
                isAnimationActive={false}
                type="linear"
                dataKey="line"
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
          <div>ПН</div>
          <div>ВТ</div>
          <div>СР</div>
          <div>ЧТ</div>
          <div>ПТ</div>
          <div>СБ</div>
          <div>ВС</div>
        </div>
      </div>
    </div>
  );
};
