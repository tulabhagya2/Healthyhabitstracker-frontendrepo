import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';

export function AnalyticsCard({ title, description, children, className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
