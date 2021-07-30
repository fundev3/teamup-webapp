import axios from "axios";

const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "projects";
const API_VERSION = "v1";

export async function getProjects() {
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}`
    );

    return data;
  } catch (error) {
    // TODO error handling
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }

    return [];
  }
}

export async function getProject(id) {
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}`
    );

    return data;
  } catch (error) {
    // TODO error handling
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }

    return;
  }
}

export async function postProject(project) {
  try {
    const route = process.env.REACT_APP_API_HOST;
    const response = await axios.post(`${route}/projects`, project);
    if (response.status === 201) return { ok: true, response };
    return { ok: false, response: null };
  } catch (e) {
    return { error: e, ok: false };
  }
}
