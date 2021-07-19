import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7071/api/", //backend api url
});

export async function GetUser(user) {
  try {
    let result = await (await instance.get(user)).data[0];
    console.log(result);
    return result;
  } catch (error) {
    alert("User not found"); //change alert message
  }
}
