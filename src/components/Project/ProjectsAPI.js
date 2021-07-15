import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default async function GetProjects() {
  try {
    let result = await (await instance.get("/users")).data;
    return result;
  } catch (error) {
    console.log(error);
  }
}