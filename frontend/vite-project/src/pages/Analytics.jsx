import { useEffect, useState } from "react";
import { AnalyticsCard } from "../components/cards/AnalyticsCard";
import { HabitChart } from "../components/charts/HabitChart";
import { GoalChart } from "../components/charts/GoalChart";
import { analyticsAPI } from "../services/api";
import { toast } from "react-toastify";

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchAnalytics();

    const handleUpdate = () => {
      fetchAnalytics();
    };

    // Listen for updates from other pages
    window.addEventListener("habitUpdated", handleUpdate);
    window.addEventListener("goalUpdated", handleUpdate);

    return () => {
      window.removeEventListener("habitUpdated", handleUpdate);
      window.removeEventListener("goalUpdated", handleUpdate);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const weeklyTrend = analyticsData?.weekly_trend || [];
  const monthlyGoalProgress = analyticsData?.monthly_goal_progress || [];
  const bestHabits = analyticsData?.best_habits || [];
  const worstHabits = analyticsData?.worst_habits || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 mt-1">
          Insights into your wellness journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCard title="Weekly Habit Completions">
          <HabitChart data={weeklyTrend} />
        </AnalyticsCard>

        <AnalyticsCard title="Monthly Goal Progress">
          <GoalChart data={monthlyGoalProgress} />
        </AnalyticsCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCard title="Best Performing Habits">
          {bestHabits.length === 0 ? (
            <p>No data available yet</p>
          ) : (
            bestHabits.map((habit, idx) => (
              <div key={idx} className="flex justify-between p-3 rounded-lg">
                <span>{habit.title}</span>
                <span>{habit.completion_rate}%</span>
              </div>
            ))
          )}
        </AnalyticsCard>

        <AnalyticsCard title="Needs Improvement">
          {worstHabits.length === 0 ? (
            <p>All habits are performing well!</p>
          ) : (
            worstHabits.map((habit, idx) => (
              <div key={idx} className="flex justify-between p-3 rounded-lg">
                <span>{habit.title}</span>
                <span>{habit.completion_rate}%</span>
              </div>
            ))
          )}
        </AnalyticsCard>
      </div>

      <AnalyticsCard title="Summary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div>{analyticsData?.total_habits || 0}</div>
            <div>Total Habits</div>
          </div>
          <div>
            <div>{analyticsData?.completed_today || 0}</div>
            <div>Completed Today</div>
          </div>
          <div>
            <div>{analyticsData?.active_goals || 0}</div>
            <div>Active Goals</div>
          </div>
          <div>
            <div>{analyticsData?.avg_completion_rate || 0}%</div>
            <div>Avg Completion</div>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
}