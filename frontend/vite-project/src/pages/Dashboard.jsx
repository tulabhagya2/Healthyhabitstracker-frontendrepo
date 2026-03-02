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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const summary = dashboardData?.summary || {
    total_habits: 0,
    daily_completions: 0,
    weekly_completions: 0,
    longest_streak: 0,
    wellness_score: 0,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your progress overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummaryCard
          title="Total Habits"
          value={summary.total_habits}
          icon={Target}
          description="Active habit trackers"
        />
        <DashboardSummaryCard
          title="Daily Completions"
          value={summary.daily_completions}
          icon={TrendingUp}
          description="Completed today"
        />
        <DashboardSummaryCard
          title="Weekly Completions"
          value={summary.weekly_completions}
          icon={Flame}
          description="This week's progress"
        />
        <DashboardSummaryCard
          title="Longest Streak"
          value={`${summary.longest_streak} days`}
          icon={Award}
          description="Keep it up!"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <WellnessChart score={summary.wellness_score || 0} />
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-semibold">
                {summary.total_habits > 0
                  ? Math.round((summary.daily_completions / summary.total_habits) * 100)
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Habits</span>
              <span className="font-semibold">{summary.total_habits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Best Streak</span>
              <span className="font-semibold">{summary.longest_streak} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-semibold">{summary.weekly_completions} completions</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}