import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { HabitCard } from '../components/cards/HabitCard';
import { HabitForm } from '../components/forms/HabitForm';
import { Button } from '../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/Dialog';
import { habitAPI } from '../services/api';
import { toast } from 'react-toastify';

export function Habits() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null); // for updating habit

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

  const handleDelete = async (habitId) => {
    try {
      await habitAPI.delete(habitId);
      toast.success('Habit deleted successfully');
      fetchHabits();
    } catch (error) {
      toast.error(error.message || 'Failed to delete habit');
    }
  };

  const handleUpdate = (habit) => {
    setSelectedHabit(habit); // set habit data
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedHabit(null);
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
              {selectedHabit ? 'Update Habit' : 'Add Habit'}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedHabit ? 'Update Habit' : 'Create New Habit'}</DialogTitle>
              <DialogDescription>
                {selectedHabit
                  ? 'Edit the details of your habit and save changes.'
                  : 'Fill in the form below to add a new habit.'}
              </DialogDescription>
            </DialogHeader>

            <HabitForm
              habit={selectedHabit} // pass habit for pre-filled form
              onSuccess={handleSuccess}
              onCancel={() => { setIsDialogOpen(false); setSelectedHabit(null); }}
            />
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
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={handleComplete}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}