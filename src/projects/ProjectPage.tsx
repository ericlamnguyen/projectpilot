import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";
import ProjectDetail from "./ProjectDetail";

export default function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  useEffect(() => {
    async function LoadProject() {
      setLoading(true);
      try {
        const data = await projectAPI.find(id);
        setProject(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      LoadProject();
    }
  }, [id]);

  return (
    <div>
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        <div className="row">
          {error && (
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          )}
        </div>

        {project && <ProjectDetail project={project} />}
      </>
    </div>
  );
}
