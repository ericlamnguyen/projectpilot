import { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
    const updatedProjects = projects.map((p: Project) =>
      p.id === project.id ? project : p,
    );
    setProjects(updatedProjects);
  };

  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject} />
    </>
  );
}
