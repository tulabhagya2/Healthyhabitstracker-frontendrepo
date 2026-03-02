import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function HabitChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        {/* X and Y Axes */}
        <XAxis
          dataKey="name"
          stroke="#475569"
          tick={{ fontSize: 12, fill: '#334155' }}
        />
        <YAxis
          stroke="#475569"
          tick={{ fontSize: 12, fill: '#334155' }}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
            color: '#0f172a',
          }}
        />

        {/* Legend */}
        <Legend
          wrapperStyle={{
            fontSize: 14,
            color: '#0f172a',
          }}
        />

        {/* Bars */}
        <Bar
          dataKey="completions"
          fill="hsl(var(--primary))"
          radius={[6, 6, 0, 0]} // rounded top corners
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}