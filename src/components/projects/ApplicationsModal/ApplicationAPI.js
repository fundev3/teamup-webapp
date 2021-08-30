import { alertError } from "../../../store/actions/alertActions";
import axios from "axios";
import store from "../../../store";

const API_HOST_PROJECTS = process.env.REACT_APP_API_PROJECTS_URL;
const API_HOST_RESUMES = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME_PROJECTS = "projects";
const API_NAME_POSTULATIONS = "postulations";
const API_VERSION = "v1";

export async function updateProject(projectId, idResume, name) {
  const patch = [
    {
      op: "add",
      path: "/MemberList/-",
      value: { idResume, name },
    },
  ];
  try {
    await axios.patch(
      `${API_HOST_PROJECTS}/api/${API_VERSION}/${API_NAME_PROJECTS}/${projectId}`,
      patch
    );
  } catch (error) {
    store.dispatch(alertError(error.message));
  }
}

export async function updatePostulation(postulationId, state) {
  const patch = [
    {
      op: "replace",
      path: "/State",
      value: state,
    },
  ];
  try {
    await axios.patch(
      `${API_HOST_RESUMES}/api/${API_VERSION}/${API_NAME_POSTULATIONS}/${postulationId}`,
      patch
    );
  } catch (error) {
    store.dispatch(alertError(error.message));
  }
}
