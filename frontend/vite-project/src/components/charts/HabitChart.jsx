import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export function HabitChart({ data }) {

  if (!data || data.length === 0) {
    return <p>No habit data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="completed" />
      </BarChart>
    </ResponsiveContainer>
  );
}