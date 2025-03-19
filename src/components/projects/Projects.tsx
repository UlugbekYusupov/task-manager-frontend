"use client";
import { useProjects } from "@/hooks/useProjects";
import ComponentCard from "../common/ComponentCard";
import ProjectCard from "./ProjectCard";
import { Modal } from "../ui/modal";
import { useState } from "react";
import CreateProjectForm from "./ProjectForm";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED";
  owner: { username: string };
  members: { username: string }[];
  tasks: { id: string }[];
  onClick: () => void;
}

interface ProjectData {
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED";
  members: string[];
}
export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data, isLoading, isError } = useProjects();
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching projects.</p>;

  const handleProjectClick = (project: Project) => {
    console.log("Project clicked:", project.name);
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleCreateProjectClick = () => {
    console.log("Create project clicked");
    setSelectedProject(null);
    setIsOpen(true);
  };

  const handleFormSubmit = (projectData: ProjectData) => {
    console.log("Form submitted:", projectData);
    setIsOpen(false);
    setSelectedProject(null);
  };

  return (
    <ComponentCard title="My Projects" onClick={handleCreateProjectClick}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.ownedProjects.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Owned Projects</h2>
            {data.ownedProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                id={`${project.id}`}
                name={project.name}
                description={project.description}
                status={project.status}
                owner={{ username: project.owner.username }}
                members={project.members} // Members still passed to ProjectCard
                tasks={project.tasks}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        )}

        <Modal
          className="max-w-[700px] p-6 lg:p-10"
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedProject(null);
          }}
        >
          <CreateProjectForm
            onSubmit={handleFormSubmit}
            onClose={() => {
              setIsOpen(false);
              setSelectedProject(null);
            }}
            initialProject={selectedProject}
          />
        </Modal>

        {data?.participatedProjects.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Participated Projects</h2>
            {data.participatedProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                id={`${project.id}`}
                name={project.name}
                description={project.description}
                status={project.status}
                owner={{ username: project.owner.username }}
                members={project.members} // Members still passed to ProjectCard
                tasks={project.tasks}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
