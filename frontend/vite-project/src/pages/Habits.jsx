import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { HabitCard } from '../components/cards/HabitCard';
import { HabitForm } from '../components/forms/HabitForm';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { habitAPI } from '../services/api';
import { toast } from 'react-toastify';

export function Habits() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const data = await habitAPI.getAll();
      setHabits(data.habits || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch habits');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (habitId) => {
    try {
      await habitAPI.complete(habitId);
      toast.success('Habit completed!');
      fetchHabits();
    } catch (error) {
      toast.error(error.message || 'Failed to complete habit');
    }
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    fetchHabits();
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Habits</h1>
          <p className="text-muted-foreground mt-1">Track and manage your daily habits</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
            </DialogHeader>
            <HabitForm onSuccess={handleSuccess} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No habits yet. Create your first habit to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onComplete={handleComplete} />
          ))}
        </div>
      )}
    </div>
  );
}
