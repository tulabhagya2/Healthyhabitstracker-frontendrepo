
import { useState, useEffect } from 'react';
import { Target, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { Input } from '../ui/Input';
import Confetti from 'react-confetti';
import { getProgressPercentage, getCategoryColor, getStatusBadgeColor } from '../../utils/helpers';

const quotes = [
  "Small steps every day lead to big achievements.",
  "Progress, not perfection.",
  "Consistency is the key to success.",
  "Every step counts towards your goal.",
  "Believe in yourself and all that you are.",
  "Your future is created by what you do today.",
  "Keep going, you're getting stronger every day.",
  "Celebrate small wins along the way.",
  "Dream big, start small, act now.",
  "Success is the sum of small efforts repeated daily."
];

export function GoalCard({ goal, onUpdateProgress }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progressValue, setProgressValue] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const progress = getProgressPercentage(goal.current_amount || 0, goal.target_amount);

  // Show confetti for completed goals
  useEffect(() => {
    if (goal.status === 'completed') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000); // 3 sec
      return () => clearTimeout(timer);
    }
  }, [goal.status]);

  const handleUpdate = async () => {
    if (!progressValue || isNaN(progressValue)) return;
    await onUpdateProgress(goal.id, { amount: Number(progressValue) });
    setProgressValue('');
    setIsUpdating(false);
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Card className="hover:shadow-xl transition-shadow bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 relative">
      
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={150} />}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">{goal.title}</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{goal.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getCategoryColor(goal.category)} text-white`}>
            {goal.category}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Progress</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {goal.current_amount || 0} / {goal.target_amount}
            </span>
          </div>

          <Progress value={progress} className="h-3 rounded-full bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeColor(goal.status)} text-white`}>
              {goal.status.toUpperCase()}
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{progress}%</span>
          </div>

          <p className="text-sm text-blue-700 dark:text-blue-400 italic mt-1">"{randomQuote}"</p>

          {isUpdating ? (
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="Add progress"
                value={progressValue}
                onChange={(e) => setProgressValue(e.target.value)}
                className="flex-1 border-green-300 dark:border-green-500"
              />
              <Button size="sm" onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white">
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsUpdating(false)} className="border-red-500 text-red-500 hover:bg-red-100">
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => setIsUpdating(true)} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
              <Plus className="h-4 w-4 mr-1" />
              Update Progress
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
