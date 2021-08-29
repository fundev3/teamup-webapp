import { alertError } from "../../../store/actions/alertActions";
import axios from "axios";
import store from "../../../store";

const API_HOST_PROJECTS = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "projects";
const API_VERSION = "v1";

export async function updateProject(projectId, idResume, name) {
  let project = [];
  const patch = [
    {
      op: "add",
      path: "/MemberList/-",
      value: { idResume, name },
    },
  ];
  try {
    const { data } = await axios.patch(
      `${API_HOST_PROJECTS}/api/${API_VERSION}/${API_NAME}/${projectId}`,
      patch
    );
    project = data;
    return project;
  } catch (error) {
    store.dispatch(alertError(error.message));
  }
}
