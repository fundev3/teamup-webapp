import { alertError } from "../../store/actions/alertActions";
import axios from "axios";
import store from "../../store";

const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";

export async function getInvitationsByResume(id) {
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
