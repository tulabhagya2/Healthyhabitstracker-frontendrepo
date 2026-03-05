import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export function GoalChart({ data }) {

  if (!data || data.length === 0) {
    return <p>No goal data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          outerRadius={80}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}