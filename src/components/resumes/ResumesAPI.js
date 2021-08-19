import { alertError } from "../../store/actions/alertActions";
import axios from "axios";
import store from "../../store";

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

/*  export async function getResume(id) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(
      // `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}`
      "http://localhost:7071/api/v1/resumes/" + id
    );
    return { data, handlerError };
  } catch (error) {
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
*/

export async function getSkillsByName(name) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(`${API_NAME_SKILLS}?name=${name}`);
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

export async function postSkillsById(id, skill) {
  let handlerError = false;
  const data = {};
  try {
    const { data } = await axios.get(
      `${API_NAME_SKILLS}?id=${id}&skill=${skill}`
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

export async function getResume(id) {
  try {
    const resume = {
      data: {
        contact: {
          address: "Calle Los Bosques",
          email: "linaRamirez@corp",
          id: 1,
          phone: 74589658,
        },
        creationDate: "2020-05-11T08:08:08",
        id: 2,
        lastUpdate: "2020-12-20T15:30:02",
        person: {
          birthdate: "1995-01-09T00:00:00",
          firstName: "Lina",
          id: 1,
          lastName: "Ramirez",
          picture: null,
        },
        skills: [
          {
            emsiId: "KS126XS6CQCFGC3NG79X",
            id: 2,
            name: "JAVA",
          },
          {
            emsiId: "K946F11A9E1FD1GZ3FG1",
            id: 5,
            name: "RUBY",
          },
        ],
        summary: null,
        title: "Lina Resume",
      },
    };
    return resume;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
  }
}
