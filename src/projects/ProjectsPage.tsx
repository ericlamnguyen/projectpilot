import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={MOCK_PROJECTS} />
    </>
  );
}
