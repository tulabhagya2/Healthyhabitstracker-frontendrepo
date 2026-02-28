import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const getDaysSince = (date) => {
  if (!date) return 0;
  const now = new Date();
  const then = new Date(date);
  const diffTime = Math.abs(now - then);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateStreak = (lastCompleted) => {
  if (!lastCompleted) return 0;
  const daysSince = getDaysSince(lastCompleted);
  return daysSince <= 1 ? 1 : 0;
};

export const getProgressPercentage = (current, target) => {
  if (!target || target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

export const getCategoryColor = (category) => {
  const colors = {
    Fitness: 'bg-blue-500',
    Hydration: 'bg-cyan-500',
    Sleep: 'bg-purple-500',
    Mindfulness: 'bg-green-500',
    Nutrition: 'bg-orange-500',
    General: 'bg-gray-500',
  };
  return colors[category] || colors.General;
};

export const getCategoryColorText = (category) => {
  const colors = {
    Fitness: 'text-blue-500',
    Hydration: 'text-cyan-500',
    Sleep: 'text-purple-500',
    Mindfulness: 'text-green-500',
    Nutrition: 'text-orange-500',
    General: 'text-gray-500',
  };
  return colors[category] || colors.General;
};

export const getStatusBadgeColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return colors[status] || colors.pending;
};

export const getWellnessScoreColor = (score) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-blue-500';
  if (score >= 40) return 'text-yellow-500';
  return 'text-red-500';
};

export const getWellnessScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Improvement';
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const groupByDate = (items, dateField = 'created_at') => {
  return items.reduce((groups, item) => {
    const date = formatDate(item[dateField]);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};
