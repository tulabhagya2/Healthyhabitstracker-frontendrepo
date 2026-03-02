import { Check, Flame, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { getCategoryColor, formatDate } from '../../utils/helpers';
import { useState, useEffect } from 'react';

const motivationalQuotes = [
  "Consistency is key! 🔑",
  "Small steps every day lead to big results! 🚀",
  "Your future self will thank you! 💪",
  "Every streak counts! 🔥",
  "Keep going, you’re doing great! 🌟"
];

export function HabitCard({ habit, onComplete, onDelete, onUpdate }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, [habit.id]);

  const isCompletedToday = habit.last_completed_date &&
    new Date(habit.last_completed_date).toDateString() === new Date().toDateString();

  return (
    <Card className="hover:shadow-xl transition-shadow border-l-4 border-green-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{habit.title}</CardTitle>
            {habit.description && <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>}
            <p className="text-xs text-blue-500 mt-1 italic">{quote}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(habit.category)} text-white`}
          >
            {habit.category}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-bold text-lg">{habit.streak || 0}</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
            {habit.last_completed_date && (
              <div className="text-sm text-muted-foreground">
                Last: {formatDate(habit.last_completed_date)}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onComplete(habit.id)}
              disabled={isCompletedToday}
              className={isCompletedToday ? 'bg-green-500 hover:bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}
            >
              {isCompletedToday ? <><Check className="h-4 w-4 mr-1"/>Completed</> : 'Complete'}
            </Button>

            <Button size="sm" onClick={() => onUpdate(habit)} className="bg-yellow-500 hover:bg-yellow-600">
              <Edit className="h-4 w-4 mr-1"/>Edit
            </Button>

            <Button size="sm" onClick={() => onDelete(habit.id)} className="bg-red-500 hover:bg-red-600">
              <Trash className="h-4 w-4 mr-1"/>Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}