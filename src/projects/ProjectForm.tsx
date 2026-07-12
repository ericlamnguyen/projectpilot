import { useState, type SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  // Object Destructuring with Renaming: rename the `project` prop to `initialProject`
  // to avoid naming conflicts with the state variable from the useState hook.
  project: initialProject,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(project);
  };

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
    // "=> new Project" is functionally equivalent to "=> { return new Project }"
    setProject((prevProject) => new Project({ ...prevProject, ...change }));
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
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
