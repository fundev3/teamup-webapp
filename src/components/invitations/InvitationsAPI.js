import { alertError } from "../../store/actions/alertActions";
import axios from "axios";
import store from "../../store";

const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "projects";
const API_VERSION = "v1";

export async function getInvitationsByProject(id) {
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}/invitations`
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
    return [];
  }
}

export async function postInviteResumes(id, resume) {
  try {
    const response = await axios.post(
      `${API_HOST}/api/${API_VERSION}/invitations`,
      resume
    );
    if (response.status === 201) return { ok: true, response };
    return { ok: false, response: null };
  } catch (e) {
    return { error: e, ok: false };
  }
}

export async function getInvitationsByResume(id) {
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/resumes/${id}/invitations`
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
    return [];
  }
}
