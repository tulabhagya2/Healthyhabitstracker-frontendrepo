import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ActivityCard } from "../components/cards/ActivityCard";
import { ActivityForm } from "../components/forms/ActivityForm";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/Dialog";
import { activityAPI } from "../services/api";
import { toast } from "react-toastify";

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // ================= FETCH =================
  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const data = await activityAPI.getAll();
      setActivities(data); // 🔥 FIXED HERE
    } catch (error) {
      toast.error(error.message || "Failed to fetch activities");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // ================= EDIT =================
  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setIsDialogOpen(true);
  };

  // ================= DELETE =================
  const handleDelete = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;

    try {
      await activityAPI.delete(activityId);
      toast.success("Activity deleted successfully!");
      fetchActivities(); // refresh list
    } catch (error) {
      toast.error(error.message || "Failed to delete activity");
    }
  };

  // ================= FORM SUCCESS =================
  const handleSuccess = () => {
    setIsDialogOpen(false);
    setEditingActivity(null);
    fetchActivities(); // refresh after add/update
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingActivity(null);
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Activities</h1>
          <p className="text-gray-500 mt-1">
            Log and manage your wellness activities
          </p>
        </div>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingActivity(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingActivity ? "Edit Activity" : "Add New Activity"}
              </DialogTitle>

              {/* ✅ Fixes Radix aria warning */}
              <DialogDescription>
                {editingActivity
                  ? "Update your activity details below."
                  : "Fill the form to create a new activity."}
              </DialogDescription>
            </DialogHeader>

            <ActivityForm
              activity={editingActivity}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No activities yet. Add your first activity to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}