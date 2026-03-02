import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';

export function AnalyticsCard({ title, description, children, className }) {
  return (
    <Card
      className={`rounded-lg shadow-md transition transform hover:scale-105 ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
}