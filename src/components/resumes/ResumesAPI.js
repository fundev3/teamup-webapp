import axios from "axios";

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";
const API_NAME_SKILLS = `${API_HOST}/api/${API_VERSION}/skills`;

export async function postResume(resume) {
  try {
    const result = await axios.post(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}`,
      resume
    );
    if (result.status === 200) {
      return { ok: true };
    } else {
      result.ok = false;
      result.statusText = "Data not saved";
    }
    return result;
  } catch (err) {
    alert("Couldn't save your profile, please try again");
    return { ok: false };
  }
}

export async function getResumes() {
  let handlerError = false;
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}`
    );
    return data;
  } catch (error) {
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

export async function getResume(id) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}`
    );
    return { data, handlerError };
  } catch (error) {
    // TODO error handling
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    handlerError = true;
    return { data, handlerError };
  }
}

export async function getSkillsByName(name) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(`${API_NAME_SKILLS}?name=${name}`);
    return { data, handlerError };
  } catch (error) {
    // TODO error handling
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    handlerError = true;
    return { data, handlerError };
  }
}
