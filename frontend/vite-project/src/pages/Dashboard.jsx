import { useEffect, useState } from 'react';
import { Target, TrendingUp, Flame, Award } from 'lucide-react';
import { DashboardSummaryCard } from '../components/cards/DashboardSummaryCard';
import { WellnessChart } from '../components/charts/WellnessChart';
import { Card } from '../components/ui/Card';
import { dashboardAPI } from '../services/api';
import { toast } from 'react-toastify';

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await dashboardAPI.get();
      setDashboardData(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const summary = dashboardData?.summary || {
    totalHabits: 0,
    dailyCompletions: 0,
    weeklyCompletions: 0,
    longestStreak: 0,
    completionRate: 0,
    wellnessScore: 0,
    activeGoals: 0,
    averageGoalProgress: 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your progress overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummaryCard
          title="Total Habits"
          value={summary.totalHabits}
          icon={Target}
          description="Active habit trackers"
        />
        <DashboardSummaryCard
          title="Daily Completions"
          value={summary.dailyCompletions}
          icon={TrendingUp}
          description="Completed today"
        />
        <DashboardSummaryCard
          title="Weekly Completions"
          value={summary.weeklyCompletions}
          icon={Flame}
          description="This week's progress"
        />
        <DashboardSummaryCard
          title="Longest Streak"
          value={`${summary.longestStreak} days`}
          icon={Award}
          description="Keep it up!"
        />
      </div>

      {/* Charts + Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <WellnessChart score={summary.wellnessScore || 0} />
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-semibold">
                {summary.completionRate}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Habits</span>
              <span className="font-semibold">
                {summary.totalHabits}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Best Streak</span>
              <span className="font-semibold">
                {summary.longestStreak} days
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-semibold">
                {summary.weeklyCompletions} completions
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Goals</span>
              <span className="font-semibold">
                {summary.activeGoals}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Goal Progress</span>
              <span className="font-semibold">
                {summary.averageGoalProgress}%
              </span>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}