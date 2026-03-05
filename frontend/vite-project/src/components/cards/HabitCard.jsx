import { Flame, CheckCircle, Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

const categoryColors = {
  Fitness: "bg-blue-500",
  Nutrition: "bg-green-500",
  Mindfulness: "bg-purple-500",
  Sleep: "bg-indigo-500",
};

const quotes = {
  Fitness: "Push your limits 💪",
  Nutrition: "Fuel your body right 🥗",
  Mindfulness: "Calm mind, strong life 🧘",
  Sleep: "Rest is productivity 😴",
};

export default function HabitCard({ habit, onEdit, onDelete, onComplete }) {
  const isCompletedToday =
    habit.last_completed_date &&
    new Date(habit.last_completed_date).toDateString() ===
      new Date().toDateString();

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-2xl shadow-lg border-l-4 border-green-500 bg-white">
        <CardContent className="p-6 space-y-4">
          {/* Title + Category */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">{habit.title}</h2>
              <p className="text-sm text-gray-500">{habit.description}</p>
              <p className="text-xs italic text-blue-600 mt-1">
                {quotes[habit.category]}
              </p>
            </div>

            <span
              className={`text-white text-xs px-2 py-1 rounded-md ${categoryColors[habit.category]}`}
            >
              {habit.category}
            </span>
          </div>

          {/* Goal */}
          <div className="text-sm text-gray-700">
            🎯 Goal: {habit.goal_amount} {habit.goal_type}
          </div>

          {/* Streak */}
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <Flame size={18} />
            {habit.streak || 0} day streak
          </div>

          {/* Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={onComplete}
              disabled={isCompletedToday}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <CheckCircle size={16} className="mr-1" />
              {isCompletedToday ? "Completed" : "Complete"}
            </Button>

            <Button
              onClick={onEdit}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Edit size={16} />
            </Button>

            <Button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}