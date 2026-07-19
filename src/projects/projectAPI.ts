import { Project } from "./Project";
const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response: Response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function delay<T>(ms: number) {
  return function (x: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: Partial<Project>[]): Project[] {
  const projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: Partial<Project>): Project {
  return new Project(item);
}

const mockDelay = 2000; // Mock API call 2 seconds for testing

const projectAPI = {
  // Fetch a list of projects with optional pagination parameters
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(mockDelay)) // Simulate server delay for demo purposes, to remove eventually
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the projects. Please try again.",
        );
      });
  },

  // Update an existing project
  put(project: Project) {
    const putUrl = `${url}/${project.id}`;
    return fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error updating the project. Please try again.",
        );
      });
  },

  // Fetch a single project by its ID
  find(id: number) {
    const findUrl = `${url}/${id}`;
    return fetch(findUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the project. Please try again.",
        );
      });
  },
};

export { projectAPI };
