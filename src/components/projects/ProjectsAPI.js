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
  const url = process.env.REACT_APP_PROJECTS_URL;
  try {
    const { data: result } = await axios.get(`${url}/${id}`);
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
