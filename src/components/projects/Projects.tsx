"use client";

import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ComponentCard from "../common/ComponentCard";

interface Project {
  id: string;
  name: string;
  description: string;
}

export default function Projects() {
  const { ownedProjects, participatedProjects } = useSelector(
    (state: RootState) => state.projects
  );

  return (
    <ComponentCard title="My Projects">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ownedProjects.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Owned Projects</h2>
              {ownedProjects.map((project: Project) => (
                <div
                  key={project.id}
                  className="p-4 border border-gray-200 hover:bg-gray-100 cursor-pointer transition rounded-lg "
                >
                  <h3 className="text-md font-semibold">{project.name}</h3>
                  <p className="text-gray-500">{project.description}</p>
                </div>
              ))}
            </div>
          )}
          {participatedProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">Participated Projects</h2>
              {participatedProjects.map((project: Project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded-lg shadow-md"
                >
                  <h3 className="text-md font-semibold">{project.name}</h3>
                  <p className="text-gray-500">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
