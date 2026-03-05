import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { analyticsAPI } from "../services/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6699"];

export function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await analyticsAPI.get(); // calls backend
        setAnalytics(data);
      } catch (error) {
        console.error("Analytics error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <div className="p-6 text-center text-lg">Loading Analytics...</div>;
  if (!analytics) return <div className="p-6 text-center text-red-500">Failed to load analytics</div>;

  const { summary = {}, categoryStats = [], weeklyStats = [], streakStats = [] } = analytics;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
      <p className="text-gray-500 mt-1">Visualize your habit and goal progress</p>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Weekly Completion */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Weekly Completions</h2>
          {weeklyStats.length === 0 ? (
            <p className="text-gray-500">No weekly data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyStats}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Pie */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Habit Category Distribution</h2>
          {categoryStats.length === 0 ? (
            <p className="text-gray-500">No category data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Streak vs Goal */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Habit Streaks vs Goals</h2>
          {streakStats.length === 0 ? (
            <p className="text-gray-500">No streak data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={streakStats}>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="streak" fill="#FFBB28" />
                <Bar dataKey="goal_amount" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xl font-bold">{summary.totalHabits || 0}</div>
            <div>Total Habits</div>
          </div>
          <div>
            <div className="text-xl font-bold">{summary.totalCompleted || 0}</div>
            <div>Completed Today</div>
          </div>
          <div>
            <div className="text-xl font-bold">{summary.totalStreaks || 0}</div>
            <div>Total Streaks</div>
          </div>
          <div>
            <div className="text-xl font-bold">{summary.completionRate || 0}%</div>
            <div>Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}