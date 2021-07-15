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

/*const projects = [
  {
    id: 1,
    name: "Coffe Shop",
    description: "Project to manage coffe shop resource",
    contact: "luis@fundacion-jala",
    creationDate: "14/06/2021",
  },
  {
    id: 2,
    name: "Form's",
    description: "Project Cafeteria",
    contact: "rocio@fundacion-jala",
    creationDate: "10/06/2021",
  },
  {
    id: 3,
    name: "TASK SHOP",
    description: "Project to manage tasks",
    contact: "rocio@fundacion-jala",
    creationDate: "05/06/2021",
  },
];

export default projects;*/
