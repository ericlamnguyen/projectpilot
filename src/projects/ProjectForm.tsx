import { useState, type SyntheticEvent } from "react";
import { Project } from "./Project";
import { useSaveProject } from "./projectHooks";

interface ProjectFormProps {
  project: Project;
  onCancel: () => void;
}

export default function ProjectForm({
  // Object Destructuring with Renaming: rename the `project` prop to `initialProject`
  // to avoid naming conflicts with the state variable from the useState hook.
  project: initialProject,
  onCancel,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });
  const { mutate: saveProject, isPending } = useSaveProject();

  // Event handler for form submission
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) {
      return;
    }
    saveProject(project);
  };

  // Event handler for input changes
  const handleChange = (
    event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { type, name, value } = target;

    // Use 'in' operator or check 'type' to safely access 'checked'
    const checked = (target as HTMLInputElement).checked ? true : false;

    let updatedValue: string | boolean | number =
      type === "checkbox" ? checked : value;

    if (type === "number") {
      updatedValue = Number(value);
    }

    // [name] => "Computed Property Name" (ES6 feature) to dynamically set the property name
    // Using { name: updatedValue } would literally set a property called "name"
    // instead of the value of the variable name, ie functionally the same as { "name": updatedValue }
    const change = { [name]: updatedValue };

    // Use "Functional Update" pattern to ensure we have the latest state
    let updatedProject: Project;
    setProject((prevProject: Project) => {
      updatedProject = new Project({ ...prevProject, ...change });
      return updatedProject;
    });

    setErrors(() => validate(updatedProject));
  };

  // Validation function to check the project fields and return an object with error messages
  function validate(project: Project) {
    const errors = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required.";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget <= 0) {
      errors.budget = "Budget must be greater than zero.";
    }
    return errors;
  }

  // Function to check if the form is valid based on the errors object
  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      {isPending && <span className="toast">Saving...</span>}
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium" type="submit">
          Save
        </button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}
