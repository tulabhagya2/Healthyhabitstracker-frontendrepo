import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { habitAPI } from '../../services/api';
import { toast } from 'react-toastify';

export function HabitForm({ habit = null, onSuccess, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Fitness');
  const [goalType, setGoalType] = useState('daily');
  const [goalAmount, setGoalAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (habit) {
      // Pre-fill the form if editing
      setTitle(habit.title || '');
      setDescription(habit.description || '');
      setCategory(habit.category || 'Fitness');
      setGoalType(habit.goal_type || 'daily');
      setGoalAmount(habit.goal_amount || '');
    }
  }, [habit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !goalAmount) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      if (habit) {
        // Update habit
        await habitAPI.update(habit.id, { title, description, category, goalType, goalAmount });
        toast.success('Habit updated successfully!');
      } else {
        // Add new habit
        await habitAPI.add({ title, description, category, goalType, goalAmount });
        toast.success('Habit added successfully!');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title *</label>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter habit title" 
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <Input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description (optional)" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fitness">Fitness</SelectItem>
            <SelectItem value="Study">Study</SelectItem>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Type</label>
        <Select value={goalType} onValueChange={setGoalType}>
          <SelectTrigger>
            <SelectValue placeholder="Select goal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Goal Amount *</label>
        <Input 
          type="number"
          value={goalAmount} 
          onChange={(e) => setGoalAmount(e.target.value)} 
          placeholder="Enter goal amount" 
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : habit ? 'Update Habit' : 'Add Habit'}</Button>
      </div>
    </form>
  );
}