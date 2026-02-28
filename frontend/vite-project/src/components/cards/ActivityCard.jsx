import { Edit, Trash2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { getCategoryColor, formatDateTime } from '../../utils/helpers';

export function ActivityCard({ activity, onEdit, onDelete }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{activity.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(activity.category)} text-white`}>
            {activity.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{activity.duration || 0} min</span>
            </div>
            {activity.created_at && (
              <div className="text-sm text-muted-foreground">
                {formatDateTime(activity.created_at)}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(activity)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(activity.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
