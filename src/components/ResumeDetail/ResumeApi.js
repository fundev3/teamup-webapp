import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users/",
});

export async function GetUser(user) {
  try {
    let result = await (await instance.get(user)).data;
    return result;
  } catch (error) {
    console.log(error);
  }
}
