import { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { Input } from '../ui/Input';
import { getProgressPercentage, getCategoryColor, getStatusBadgeColor } from '../../utils/helpers';

export function GoalCard({ goal, onUpdateProgress }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progressValue, setProgressValue] = useState('');

  const progress = getProgressPercentage(goal.current_amount || 0, goal.target_amount);

  const handleUpdate = async () => {
    if (!progressValue || isNaN(progressValue)) return;
    await onUpdateProgress(goal.id, { amount: Number(progressValue) });
    setProgressValue('');
    setIsUpdating(false);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{goal.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(goal.category)} text-white`}>
            {goal.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">
              {goal.current_amount || 0} / {goal.target_amount}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeColor(goal.status)}`}>
              {goal.status}
            </span>
            <span className="text-sm font-semibold">{progress}%</span>
          </div>
          {isUpdating ? (
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Add progress"
                value={progressValue}
                onChange={(e) => setProgressValue(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={handleUpdate}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsUpdating(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => setIsUpdating(true)} className="w-full">
              <Plus className="h-4 w-4 mr-1" />
              Update Progress
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
