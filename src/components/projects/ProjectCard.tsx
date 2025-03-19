import React from "react";

interface ProjectProps {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED";
  owner: { username: string };
  members: { username: string }[];
  tasks: { id: string }[];
  onClick: () => void;
}

const statusColors = {
  ACTIVE: "bg-green-500",
  COMPLETED: "bg-gray-500",
};

const ProjectCard: React.FC<ProjectProps> = ({
  id,
  name,
  description,
  status,
  owner,
  members,
  tasks,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg border border-gray-200  p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span
          className={`px-2 py-1 text-xs text-white rounded-md ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-600 line-clamp-2 overflow-hidden text-sm mt-1">
        {description}
      </p>

      <p className="text-xs text-gray-500 mt-2">Owner: {owner.username}</p>

      <div className="flex items-center mt-2">
        <p className="text-xs text-gray-500">Members:</p>
        <div className="flex ml-2">
          {members.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 -ml-2 border"
            >
              {member.username.charAt(0)}
            </div>
          ))}
        </div>
        {members.length > 3 && (
          <span className="ml-2 text-xs text-gray-500">
            +{members.length - 3} more
          </span>
        )}
      </div>

      <div className="text-xs text-gray-500 mt-2">Tasks: {tasks.length}</div>
    </div>
  );
};

export default ProjectCard;
