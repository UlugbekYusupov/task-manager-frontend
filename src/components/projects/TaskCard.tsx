import React from "react";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "TEST" | "IN_PROGRESS" | "DONE";
  type: "BUG" | "STORY";
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignedTo?: { username: string } | null;
}

const statusColors = {
  OPEN: "bg-gray-500",
  TEST: "bg-blue-500",
  IN_PROGRESS: "bg-yellow-500",
  DONE: "bg-green-500",
};

const priorityColors = {
  LOW: "text-green-600",
  MEDIUM: "text-yellow-600",
  HIGH: "text-red-600",
};

const TaskCard: React.FC<TaskProps> = ({
  id,
  title,
  description,
  status,
  type,
  priority,
  assignedTo,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg">
      {/* Header: Task Title + Status */}
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">{title}</h3>
        <span
          className={`px-2 py-1 text-xs text-white rounded-md ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Task Description */}
      <p className="text-gray-600 text-sm mt-1">{description}</p>

      {/* Type & Priority */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Type: {type}</span>
        <span className={`font-bold ${priorityColors[priority]}`}>
          Priority: {priority}
        </span>
      </div>

      {/* Assigned User */}
      {assignedTo ? (
        <p className="text-xs text-gray-500 mt-2">
          Assigned to: {assignedTo.username}
        </p>
      ) : (
        <p className="text-xs text-gray-400 mt-2 italic">Not assigned</p>
      )}
    </div>
  );
};

export default TaskCard;
