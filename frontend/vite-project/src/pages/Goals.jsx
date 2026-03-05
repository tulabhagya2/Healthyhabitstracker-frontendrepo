import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { GoalCard } from '../components/cards/GoalCard';
import { GoalForm } from '../components/forms/GoalForm';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { goalAPI } from '../services/api';
import { toast } from 'react-toastify';

 export function Goals() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await goalAPI.getAll();
      setGoals(data.goals || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch goals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgress = async (goalId, progressData) => {
    try {
      await goalAPI.updateProgress(goalId, progressData);

      // 🔥 Notify Analytics
      window.dispatchEvent(new Event("goalUpdated"));

      toast.success('Progress updated!');
      fetchGoals();
    } catch (error) {
      toast.error(error.message || 'Failed to update progress');
    }
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);

    // 🔥 Notify Analytics (for Add Goal)
    window.dispatchEvent(new Event("goalUpdated"));

    fetchGoals();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingGoals = goals.filter((goal) => goal.status === 'pending');
  const completedGoals = goals.filter((goal) => goal.status === 'completed');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Goals</h1>
          <p className="text-muted-foreground mt-1">
            Set and track your wellness goals
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>

            <GoalForm
              onSuccess={handleSuccess}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No goals yet. Create your first goal to get started!
          </p>
        </div>
      ) : (
        <>
          {pendingGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Goals</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pendingGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onUpdateProgress={handleUpdateProgress}
                  />
                ))}
              </div>
            </div>
          )}

          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Completed Goals</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {completedGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onUpdateProgress={handleUpdateProgress}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

