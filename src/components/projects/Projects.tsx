"use client";
import { useProjects } from "@/hooks/useProjects";
import ComponentCard from "../common/ComponentCard";
import ProjectCard from "./ProjectCard";

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
export default function Projects() {
  const { data, isLoading, isError } = useProjects();
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching projects.</p>;

  return (
    <ComponentCard title="My Projects">
      <div className="flex flex-col">
        {data?.ownedProjects.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Owned Projects</h2>
            {data.ownedProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                id={`${project.id}`}
                name={project.name}
                description={project.description}
                status={project.status}
                owner={{ username: project.owner.username }}
                members={project.members}
                tasks={project.tasks}
                onClick={() => {}}
              />
            ))}
          </div>
        )}

        {data?.participatedProjects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold">Participated Projects</h2>
            {data.participatedProjects.map((project: Project) => (
              <div key={project.id} className="p-4 border rounded-lg shadow-md">
                <h3 className="text-md font-semibold">{project.name}</h3>
                <p className="text-gray-500">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
