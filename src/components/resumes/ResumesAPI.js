import axios from "axios";

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
  try {
    const { data: result } = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL_RESUME}/resumes`
    );
    return result;
  } catch (err) {
    console.log("Couldn't get resumes, please try again", err.response);
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
