import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import ProjectsPage from "./projects/ProjectsPage";
import HomePage from "./home/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button-rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button-rounded">
          <span className="icon-projects"></span>
          Projects
        </NavLink>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
