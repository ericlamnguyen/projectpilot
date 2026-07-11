import type { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  function handleEdit(project: Project): void {
    console.log(project);
  }

  const item = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      <ProjectCard project={project} onEdit={handleEdit} />
      <ProjectForm />
    </div>
  ));

  return <div className="row">{item}</div>;
}
