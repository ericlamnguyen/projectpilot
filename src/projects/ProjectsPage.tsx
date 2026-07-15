import { useEffect, useState } from "react";
// import { MOCK_PROJECTS } from "./MockProjects";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch projects from the API when the component mounts or when currentPage changes
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError(null);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          // Append new projects to the existing list for pagination
          setProjects((prevProjects) => [...prevProjects, ...data]);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [currentPage]);

  // Function to load more projects for pagination
  const loadMoreProjects = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle saving a project after editing
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

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button onClick={loadMoreProjects} className="btn btn-primary">
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-indicator center-page">
          <span className="loading-spinner"></span>
          Loading...
        </div>
      )}
    </>
  );
}
