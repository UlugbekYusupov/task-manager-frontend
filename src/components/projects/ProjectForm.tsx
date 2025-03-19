"use client";
import { useState, FormEvent, ChangeEvent } from "react";

interface ProjectData {
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED";
  members: string[];
}

interface Member {
  id: number;
  name: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED";
  owner: { username: string };
  members: { username: string }[];
  tasks: { id: string }[];
}

interface CreateProjectFormProps {
  onSubmit: (projectData: ProjectData) => void;
  onClose: () => void;
  initialProject?: Project | null;
}

interface FormState {
  projectName: string;
  projectDescription: string;
  projectStatus: "ACTIVE" | "COMPLETED";
  selectedMembers: string[];
}

function CreateProjectForm({
  onSubmit,
  onClose,
  initialProject,
}: CreateProjectFormProps) {
  const [formState, setFormState] = useState<FormState>({
    projectName: initialProject?.name || "",
    projectDescription: initialProject?.description || "",
    projectStatus: initialProject?.status || "ACTIVE",
    // In create mode, assume logged-in user (owner) will be added by backend; in edit mode, include owner
    selectedMembers: initialProject?.members.map((m) => m.username) || [],
  });

  // Dummy list of all possible members (replace with backend fetch)
  const availableMembers: Member[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
  ];

  // Get the owner’s username if editing an existing project
  const ownerUsername = initialProject?.owner.username;

  // Handle checkbox changes, preventing owner removal in edit mode
  const handleMemberChange = (memberName: string, isChecked: boolean) => {
    if (initialProject && memberName === ownerUsername && !isChecked) {
      // Prevent owner from being removed
      return;
    }
    setFormState((prev) => ({
      ...prev,
      selectedMembers: isChecked
        ? [...prev.selectedMembers, memberName]
        : prev.selectedMembers.filter((m) => m !== memberName),
    }));
  };

  // Handle removing a member, preventing owner removal in edit mode
  const handleRemoveMember = (memberName: string) => {
    if (initialProject && memberName === ownerUsername) {
      // Prevent owner from being removed
      return;
    }
    setFormState((prev) => ({
      ...prev,
      selectedMembers: prev.selectedMembers.filter((m) => m !== memberName),
    }));
  };

  // Handle input changes for other fields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof FormState
  ) => {
    const { value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const projectData: ProjectData = {
      name: formState.projectName,
      description: formState.projectDescription,
      status: formState.projectStatus,
      members: formState.selectedMembers,
    };
    // Ensure owner is included in edit mode (optional safety net)
    if (initialProject && !projectData.members.includes(ownerUsername!)) {
      projectData.members.push(ownerUsername!);
    }
    onSubmit(projectData);
    onClose();
  };

  return (
    <div className="rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {initialProject ? "Edit Project" : "Create New Project"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={formState.projectName}
            onChange={(e) => handleInputChange(e, "projectName")}
            placeholder="Enter project name"
            className="w-full p-2 border outline-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formState.projectDescription}
            onChange={(e) => handleInputChange(e, "projectDescription")}
            placeholder="Enter project description"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={formState.projectStatus}
            onChange={(e) => handleInputChange(e, "projectStatus")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Members Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Members</h3>
          {initialProject ? (
            // Edit Mode: Show current members with remove option + checkboxes for all members
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {formState.selectedMembers.map((member) => (
                  <div
                    key={member}
                    className="flex items-center bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <span className="text-gray-700">{member}</span>
                    {member !== ownerUsername && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                {availableMembers.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formState.selectedMembers.includes(member.name)}
                      onChange={(e) =>
                        handleMemberChange(member.name, e.target.checked)
                      }
                      disabled={initialProject && member.name === ownerUsername} // Disable owner checkbox
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="text-gray-700">{member.name}</span>
                    {member.name === ownerUsername && (
                      <span className="text-sm text-gray-500">(Owner)</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            // Create Mode: Checkboxes only (owner added by backend)
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
              {availableMembers.map((member) => (
                <label key={member.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formState.selectedMembers.includes(member.name)}
                    onChange={(e) =>
                      handleMemberChange(member.name, e.target.checked)
                    }
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{member.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 transition cursor-pointer ease-in duration-200  bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {initialProject ? "Update Project" : "Create Project"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 transition ease-in duration-200  bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-black cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProjectForm;
