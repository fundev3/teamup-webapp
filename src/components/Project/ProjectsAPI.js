import axios from "axios";

export default async function getProjects() {
  let handlerError = false;
  try {
    const { data: result } = await axios.get(
      "http://localhost:7071/api/projects"
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
