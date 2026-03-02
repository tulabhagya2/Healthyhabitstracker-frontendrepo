import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function GoalChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /> {/* light gray grid */}
        <XAxis dataKey="name" stroke="#475569" />  {/* gray x-axis */}
        <YAxis stroke="#475569" />
        <Tooltip
          contentStyle={{ backgroundColor: '#f1f5f9', borderRadius: '8px', border: 'none' }}
          labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="progress"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ r: 5, fill: 'hsl(var(--primary))' }}
          activeDot={{ r: 7 }}
          strokeLinecap="round"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}