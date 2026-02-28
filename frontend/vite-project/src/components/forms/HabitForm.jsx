import { useState } from "react";
import { toast } from "react-toastify";
import { habitAPI } from "../../services/api";

export function HabitForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Fitness",
    goalType: "daily", // matches backend
    goalAmount: 1,     // matches backend
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.goalAmount) newErrors.goalAmount = "Goal Amount is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await habitAPI.add(formData);
      toast.success("Habit created successfully!");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Failed to create habit");
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-white dark:bg-[#222] rounded-lg shadow-md space-y-4"
    >
      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Habit Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Morning Exercise"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
        />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your habit..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100 resize-none"
        />
      </div>

      {/* Category */}
      <div className="relative z-10">
        <label htmlFor="category" className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) => handleSelectChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100 appearance-none"
        >
          <option value="Fitness">Fitness</option>
          <option value="Hydration">Hydration</option>
          <option value="Sleep">Sleep</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Nutrition">Nutrition</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Goal Type */}
      <div className="relative z-10">
        <label htmlFor="goalType" className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Goal Type
        </label>
        <select
          id="goalType"
          name="goalType"
          value={formData.goalType}
          onChange={(e) => handleSelectChange("goalType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100 appearance-none"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      {/* Goal Amount */}
      <div>
        <label htmlFor="goalAmount" className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">
          Goal Amount
        </label>
        <input
          type="number"
          id="goalAmount"
          name="goalAmount"
          min="1"
          value={formData.goalAmount}
          onChange={handleChange}
          placeholder="e.g., 1"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100 appearance-none"
          style={{ MozAppearance: "textfield" }} // remove Firefox arrows
        />
        <style>
          {`input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }`}
        </style>
      </div>

      {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}