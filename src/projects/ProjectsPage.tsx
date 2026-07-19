// import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { useProjects } from "./projectHooks";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    setCurrentPage,
    saveProject,
    saving,
    savingError,
  } = useProjects();

  const handleMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h1>Projects</h1>

      {loading && (
        <div className="loading-indicator center-page">
          <span className="loading-spinner"></span>
          Loading...
        </div>
      )}

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

      {saving && <span className="toast">Saving...</span>}

      {savingError && (
        <div className="card large error">
          <section>
            <p>
              <span className="icon-alert inverse"></span>
              {savingError}
            </p>
          </section>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button onClick={handleMoreClick} className="btn btn-primary">
                More...
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
