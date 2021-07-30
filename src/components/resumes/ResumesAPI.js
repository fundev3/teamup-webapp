import axios from "axios";

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";

export async function postResume(resume) {
  try {
    const resumes = await axios.post(
      "http://localhost:7071/api/resumes",
      resume
    );

    return resumes;
  } catch (err) {
    // TODO error handling
    alert("Couldn't save your profile, please try again");
    return;
  }
}

export default async function getResumes() {
  let handlerError = false;
  try {
    const { data: result } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}`
    );

    return data;
  } catch (error) {
    // TODO error handling
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }

    return [];
  }
}
