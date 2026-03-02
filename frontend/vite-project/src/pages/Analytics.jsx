import { useEffect, useState } from "react";
import { AnalyticsCard } from "../components/cards/AnalyticsCard";
import { HabitChart } from "../components/charts/HabitChart";
import { GoalChart } from "../components/charts/GoalChart";
import { analyticsAPI } from "../services/api";
import { toast } from "react-toastify";

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await analyticsAPI.get();
      setAnalyticsData(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch analytics");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const weeklyTrend = analyticsData?.weekly_trend || [
    { name: "Mon", completions: 0 },
    { name: "Tue", completions: 0 },
    { name: "Wed", completions: 0 },
    { name: "Thu", completions: 0 },
    { name: "Fri", completions: 0 },
    { name: "Sat", completions: 0 },
    { name: "Sun", completions: 0 },
  ];

  const monthlyGoalProgress = analyticsData?.monthly_goal_progress || [
    { name: "Week 1", progress: 0 },
    { name: "Week 2", progress: 0 },
    { name: "Week 3", progress: 0 },
    { name: "Week 4", progress: 0 },
  ];

  const bestHabits = analyticsData?.best_habits || [];
  const worstHabits = analyticsData?.worst_habits || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 mt-1">Insights into your wellness journey</p>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCard
          title="Weekly Habit Completions"
          description="Your habit completion trend over the past week"
          className="bg-blue-50 dark:bg-blue-900/20"
        >
          <HabitChart data={weeklyTrend} />
        </AnalyticsCard>

        <AnalyticsCard
          title="Monthly Goal Progress"
          description="Track your goal progress over the month"
          className="bg-purple-50 dark:bg-purple-900/20"
        >
          <GoalChart data={monthlyGoalProgress} />
        </AnalyticsCard>
      </div>

      {/* Best & Worst Habits */}
      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCard
          title="Best Performing Habits"
          description="Your most consistent habits"
          className="bg-green-50 dark:bg-green-900/20"
        >
          {bestHabits.length === 0 ? (
            <p className="text-gray-500">No data available yet</p>
          ) : (
            <div className="space-y-2">
              {bestHabits.map((habit, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-800 rounded-lg animate-fadeIn"
                >
                  <span className="font-medium text-green-900 dark:text-green-200">
                    {habit.title}
                  </span>
                  <span className="text-sm text-green-700 dark:text-green-300">
                    {habit.completion_rate}% completion
                  </span>
                </div>
              ))}
            </div>
          )}
        </AnalyticsCard>

        <AnalyticsCard
          title="Needs Improvement"
          description="Habits that need more attention"
          className="bg-yellow-50 dark:bg-yellow-900/20"
        >
          {worstHabits.length === 0 ? (
            <p className="text-gray-500">All habits are performing well!</p>
          ) : (
            <div className="space-y-2">
              {worstHabits.map((habit, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-yellow-100 dark:bg-yellow-800 rounded-lg animate-fadeIn"
                >
                  <span className="font-medium text-yellow-900 dark:text-yellow-200">
                    {habit.title}
                  </span>
                  <span className="text-sm text-yellow-700 dark:text-yellow-300">
                    {habit.completion_rate}% completion
                  </span>
                </div>
              ))}
            </div>
          )}
        </AnalyticsCard>
      </div>

      {/* Summary Cards */}
      <AnalyticsCard
        title="Summary"
        description="Your overall wellness statistics"
        className="bg-gray-50 dark:bg-gray-900/20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-100 dark:bg-blue-800 rounded-lg animate-fadeIn">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {analyticsData?.total_habits || 0}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
              Total Habits
            </div>
          </div>
          <div className="text-center p-4 bg-green-100 dark:bg-green-800 rounded-lg animate-fadeIn">
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">
              {analyticsData?.completed_today || 0}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
              Completed Today
            </div>
          </div>
          <div className="text-center p-4 bg-purple-100 dark:bg-purple-800 rounded-lg animate-fadeIn">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
              {analyticsData?.active_goals || 0}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
              Active Goals
            </div>
          </div>
          <div className="text-center p-4 bg-orange-100 dark:bg-orange-800 rounded-lg animate-fadeIn">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
              {analyticsData?.avg_completion_rate || 0}%
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">
              Avg. Completion
            </div>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
}