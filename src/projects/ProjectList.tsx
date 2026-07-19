import { useState } from "react";
import type { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
    console.log(projectBeingEdited);
  };

  const cancelEdit = () => {
    setProjectBeingEdited({});
  };

  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      {project === projectBeingEdited ? (
        <ProjectForm project={project} onCancel={cancelEdit} />
      ) : (
        <ProjectCard project={project} onEdit={handleEdit} />
      )}
    </div>
  ));

  return <div className="row">{items}</div>;
}
