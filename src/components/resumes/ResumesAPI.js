import axios from "axios";
import store from "../../store";
import { alertError, alertWarning } from "../../store/actions/alertActions";

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
    if (result.status === 201) return { ok: true, result };
    return { ok: false, result: null };
  } catch (err) {
    store.dispatch(alertError(`Couldn't save your profile ${err}`));
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
      store.dispatch(alertError(error.message));
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
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
    if (error.response) {
      store.dispatch(alertError(error.message));
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
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
    if (error.response) {
      store.dispatch(alertWarning("Please write a valid skill name"));
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
    }
    handlerError = true;
    return { data, handlerError };
  }
}

export async function postSkillsById(idUser, Skill) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.put(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}/${idUser}/skills`,
      Skill
    );
    return { data, handlerError };
  } catch (error) {
    if (error.response) {
      store.dispatch(alertError(error.message));
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
    }
    handlerError = true;
    return { data, handlerError };
  }
}

export async function getResumesByName(name, id) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}?name=${name}`
    );
    return { data, handlerError };
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 404) {
        store.dispatch(alertError(error.message));
      }
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
    }
    handlerError = true;
    return { data, handlerError };
  }
}

export async function getResumesBySkill(skill, id) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}?skill=${skill}`
    );
    return { data, handlerError };
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 404) {
        store.dispatch(alertError(error.message));
      }
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
    }
    handlerError = true;
    return { data, handlerError };
  }
}

export async function getApplicationsByResumeId(id) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/postulations?resumeId=${id}`
    );
    return { data, handlerError };
  } catch (error) {
    if (error.response) {
      store.dispatch(alertWarning("This resume doesn't contain applications"));
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
    }
    handlerError = true;
    return { data, handlerError };
  }
}

export async function postPostulation(postulation) {
  try {
    const result = await axios.post(
      `${API_HOST}/api/${API_VERSION}/postulations`,
      postulation
    );
    if (result.status === 200) {
      return { ok: true };
    } else {
      result.ok = false;
      result.statusText = "Data not saved";
    }
    return result;
  } catch (err) {
    store.dispatch(alertError("Couldn't save your profile, please try again"));
    return { ok: false };
  }
}
