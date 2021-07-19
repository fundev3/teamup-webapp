import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default async function GetProjects() {
  let errorHandler = true;
  try {
    let result = await (await instance.get("/users")).data;
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    return errorHandler;
  }
}
