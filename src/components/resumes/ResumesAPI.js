import axios from "axios";

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";

export async function postResume(resume) {
  try {
    const result = await axios.post(
      "http://localhost:7071/api/resumes",
      resume
    );
    if (result.status === 200) {
      return { ok: true };
    } else {
      result.ok = false;
      result.statusText = "Data not saved";
    }
    console.log(result.statusText);
    return result;
  } catch (err) {
    alert("Couldn't save your profile, please try again");
    return { ok: false };
  }
}

export default async function getResumes() {
  let handlerError = false;
  try {
    const { data: result } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}`
    );
    return result;
  } catch (error) {
    console.log("Couldn't get resumes, please try again", error.response);
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
