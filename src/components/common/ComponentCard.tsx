import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="px-4 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
        </div>
        <button
          onClick={onClick}
          className="bg-blue-500 shadow-md hover:bg-blue-600 transition ease-in duration-200 cursor-pointer px-8 py-2 rounded-lg mr-4 text-white"
        >
          Create Project
        </button>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
