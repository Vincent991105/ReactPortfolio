import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function ExchangeReport({ title }) {
  const data = Array.from({ length: 30 }, (_, i) => ({
    time: `時間：${String(i).padStart(2, "0")}:00`,
    value: parseFloat((50 + Math.random() * 50).toFixed(2)), // 50 ~ 100
  }));

  const allValues = data.map((d) => d.value);
  const yMin = parseFloat((Math.min(...allValues) * 0.95).toFixed(2));
  const yMax = parseFloat((Math.max(...allValues) * 1.05).toFixed(2));

  return (
    <div className="ExchangeReport">
      <h2>{title}</h2>
      <div className="DataChart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart pure={false} data={data}>
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExchangeReport;
