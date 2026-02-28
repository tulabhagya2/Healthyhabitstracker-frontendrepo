import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { goalAPI } from "../../services/api";
import { getValidationErrors } from "../../utils/validation";
import { toast } from "react-toastify";

export function GoalForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    targetAmount: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      title: { required: true, minLength: 2 },
      category: { required: true },
      targetAmount: { required: true, number: true, min: 1 },
    };

    const validationErrors = getValidationErrors(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await goalAPI.add({
        ...formData,
        targetAmount: Number(formData.targetAmount),
      });

      toast.success("Goal created successfully!");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create goal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-2xl shadow-lg space-y-8"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Create New Goal
        </h2>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Goal Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Save ₹50,000"
            className="w-full"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your goal..."
            className="w-full resize-none"
          />
        </div>

        {/* Category + Target */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                className="z-50 bg-white"
              >
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Hydration">Hydration</SelectItem>
                <SelectItem value="Sleep">Sleep</SelectItem>
                <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <Input
              id="targetAmount"
              name="targetAmount"
              type="number"
              min="1"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="e.g., 1000"
              className="w-full"
            />
            {errors.targetAmount && (
              <p className="text-sm text-red-500">
                {errors.targetAmount}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? "Creating..." : "Add Goal"}
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}