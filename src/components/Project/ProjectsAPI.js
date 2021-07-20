import axios from "axios";

export default async function getProjects() {
  let handlerError = false;
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const result = await response.data;
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
