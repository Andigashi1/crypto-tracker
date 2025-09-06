"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

const MiniChart = ({ data }: { data: number[] }) => {
  const last24h = data.slice(-24);
  const first = last24h[0];
  const chartData = last24h.map((price, index) => ({
    value: ((price - first) / first) * 100, // percentage change
    index,
  }));

  const isPositive = first < last24h[last24h.length - 1]; ;

  return (
    <div className="relative w-20 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#49eb34" : "#ed2431"}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;
