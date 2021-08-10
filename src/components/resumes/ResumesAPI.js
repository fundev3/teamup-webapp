import { alertError } from "../../store/actions/alertActions";
import axios from "axios";
import store from "../../store";

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";

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
    store.dispatch(alertError("Couldn't save your profile, please try again"));
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
      store.dispatch(alertError(error));
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
    // TODO error handling
    if (error.response) {
      store.dispatch(alertError(error));
    } else if (error.request) {
      store.dispatch(alertError(error.message));
    } else {
      store.dispatch(alertError("Error: Something is wrong"));
    }
    handlerError = true;
    return { data, handlerError };
  }
}
