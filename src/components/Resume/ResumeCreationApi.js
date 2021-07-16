import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7071/api",
});

export async function PostResume(resume) {
  try {
    let result = await (
      await instance.post("/resumes", resume)
    ).then((response) => {
      return response;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
