import { useEffect, useState } from "react";
// import { MOCK_PROJECTS } from "./MockProjects";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get();
        setError(null);
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const saveProject = (project: Project) => {
    const updatedProjects = projects.map((p: Project) =>
      p.id === project.id ? project : p,
    );
    setProjects(updatedProjects);
  };

  return (
    <>
      <h1>Projects</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />

      {loading && (
        <div className="loading-indicator center-page">
          <span className="loading-spinner"></span>
          Loading...
        </div>
      )}
    </>
  );
}
