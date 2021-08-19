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

/* export async function getInvitationsByResume(id) {
  try {
    const { data } = await axios.get(
      // `${API_HOST}/api/${API_VERSION}/resumes/${id}/invitations`
      `http://localhost:7072/api/v1/resumes/${id}/invitations/`
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
*/

export async function getInvitationsByResume(id) {
  try {
    const invitations = {
      data: {
        expireDate: "2021-08-29T00:00:00-04:00",
        id: "777939fd-7777-44bd-a092-f5d8434584df",
        pictureResume: "photo.png",
        projectId: "f2879e14-fd99-4364-8e18-7a1a07f3ea55",
        projectName: "TeamUp",
        resumeId: 2,
        resumeName: "Pedro",
        startDate: "2021-08-09T00:00:00-04:00",
        status: "invited",
        textInvitation:
          "We invite you to collaborate with the development team",
      },
    };

    return invitations;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    return [];
  }
}
