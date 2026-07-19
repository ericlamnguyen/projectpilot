import { useState, useEffect } from "react";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [saving, setSaving] = useState<boolean>(false);
  const [savingError, setSavingError] = useState<string | null>(null);

  // Function to load projects from the API
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((prevProjects) => [...prevProjects, ...data]);
        }
      } catch (err) {
        setError(
          "Failed to load projects - " +
            (err instanceof Error ? err.message : String(err)),
        );
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [currentPage]);

  // Function to save a project (update or create)
  const saveProject = async (project: Project) => {
    setSaving(true);
    projectAPI
      .put(project)
      .then((updatedProject) => {
        const updatedProjects = projects.map((p) =>
          p.id === updatedProject.id ? updatedProject : p,
        );
        setProjects(updatedProjects);
      })
      .catch((err) => {
        setSavingError(
          "Failed to save project - " +
            (err instanceof Error ? err.message : String(err)),
        );
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return {
    projects,
    loading,
    error,
    currentPage,
    setCurrentPage,
    saving,
    savingError,
    saveProject,
  };
}
