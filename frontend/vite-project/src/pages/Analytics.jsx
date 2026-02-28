import { useEffect, useState } from 'react';
import { AnalyticsCard } from '../components/cards/AnalyticsCard';
import { HabitChart } from '../components/charts/HabitChart';
import { GoalChart } from '../components/charts/GoalChart';
import { analyticsAPI } from '../services/api';
import { toast } from 'react-toastify';

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
      toast.error(error.message || 'Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const weeklyTrend = analyticsData?.weekly_trend || [
    { name: 'Mon', completions: 0 },
    { name: 'Tue', completions: 0 },
    { name: 'Wed', completions: 0 },
    { name: 'Thu', completions: 0 },
    { name: 'Fri', completions: 0 },
    { name: 'Sat', completions: 0 },
    { name: 'Sun', completions: 0 },
  ];

  const monthlyGoalProgress = analyticsData?.monthly_goal_progress || [
    { name: 'Week 1', progress: 0 },
    { name: 'Week 2', progress: 0 },
    { name: 'Week 3', progress: 0 },
    { name: 'Week 4', progress: 0 },
  ];

  const bestHabits = analyticsData?.best_habits || [];
  const worstHabits = analyticsData?.worst_habits || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights into your wellness journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCard title="Weekly Habit Completions" description="Your habit completion trend over the past week">
          <HabitChart data={weeklyTrend} />
        </AnalyticsCard>

        <AnalyticsCard title="Monthly Goal Progress" description="Track your goal progress over the month">
          <GoalChart data={monthlyGoalProgress} />
        </AnalyticsCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCard title="Best Performing Habits" description="Your most consistent habits">
          {bestHabits.length === 0 ? (
            <p className="text-muted-foreground">No data available yet</p>
          ) : (
            <div className="space-y-2">
              {bestHabits.map((habit, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">{habit.title}</span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {habit.completion_rate}% completion
                  </span>
                </div>
              ))}
            </div>
          )}
        </AnalyticsCard>

        <AnalyticsCard title="Needs Improvement" description="Habits that need more attention">
          {worstHabits.length === 0 ? (
            <p className="text-muted-foreground">All habits are performing well!</p>
          ) : (
            <div className="space-y-2">
              {worstHabits.map((habit, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="font-medium">{habit.title}</span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">
                    {habit.completion_rate}% completion
                  </span>
                </div>
              ))}
            </div>
          )}
        </AnalyticsCard>
      </div>

      <AnalyticsCard title="Summary" description="Your overall wellness statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analyticsData?.total_habits || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Total Habits</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analyticsData?.completed_today || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Completed Today</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {analyticsData?.active_goals || 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Active Goals</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {analyticsData?.avg_completion_rate || 0}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">Avg. Completion</div>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
}
