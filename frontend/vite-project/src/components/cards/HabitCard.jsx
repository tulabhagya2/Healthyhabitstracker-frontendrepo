import { Check, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { getCategoryColor, formatDate } from '../../utils/helpers';

export function HabitCard({ habit, onComplete }) {
  const isCompletedToday = habit.last_completed_date &&
    new Date(habit.last_completed_date).toDateString() === new Date().toDateString();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{habit.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(habit.category)} text-white`}>
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
          <Button
            size="sm"
            onClick={() => onComplete(habit.id)}
            disabled={isCompletedToday}
            className={isCompletedToday ? 'bg-green-500 hover:bg-green-500' : ''}
          >
            {isCompletedToday ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Completed
              </>
            ) : (
              'Complete'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
