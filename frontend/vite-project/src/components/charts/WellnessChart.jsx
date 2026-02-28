import { useEffect, useState } from 'react';
import { getWellnessScoreColor, getWellnessScoreLabel } from '../../utils/helpers';

export function WellnessChart({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${getWellnessScoreColor(score)} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getWellnessScoreColor(score)}`}>
            {Math.round(animatedScore)}
          </span>
          <span className="text-sm text-muted-foreground">Score</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className={`text-lg font-semibold ${getWellnessScoreColor(score)}`}>
          {getWellnessScoreLabel(score)}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Keep up the great work!
        </p>
      </div>
    </div>
  );
}
