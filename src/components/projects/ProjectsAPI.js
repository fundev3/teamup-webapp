import axios from "axios";
export default async function getProjects() {
  let handlerError = false;
  try {
    const { data: result } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    handlerError = true;
    return handlerError;
  }
}

export async function getProject(id) {
  let handlerError = false;
  const API_HOST = process.env.REACT_APP_API_HOST;
  const API_NAME = "projects";
  const API_VERSION = "v1";
  try {
    const { data: result } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}`
    );
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    handlerError = true;
    return handlerError;
  }
}
