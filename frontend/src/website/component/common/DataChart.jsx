import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DataChart({ type }) {
  const data = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i)); // 產生從 6 天前到今天的日期
    return {
      time: date.toLocaleDateString(), // 轉換成類似 "2025/7/19"
      value: parseFloat((50 + Math.random() * 50).toFixed(2)), // 50 ~ 100
    };
  });

  const allValues = data.map((d) => d.value);
  const yMin = parseFloat((Math.min(...allValues) * 0.95).toFixed(2));
  const yMax = parseFloat((Math.max(...allValues) * 1.05).toFixed(2));

  return (
    <div className="DataChart">
      <ResponsiveContainer width="100%" height="100%">
        {type === "linechart" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={[yMin, yMax]} hide={true} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={[yMin, yMax]} hide={true} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default DataChart;
