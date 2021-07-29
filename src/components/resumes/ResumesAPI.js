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

export async function getResumes() {
  let result = {};
  try {
    const { data: result } = await axios.get(
      "http://localhost:7071/api/v1/resumes"
    );
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    return result;
  }
}

export async function getResume(id) {
  try {
    const { data: result } = await axios.get(
      `http://localhost:7071/api/v1/resumes/${id}`
    );
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    return error;
  }
}
