import type { Project } from "./Project";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const item = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      <ProjectCard project={project} />
    </div>
  ));

  return <div className="row">{item}</div>;
}
