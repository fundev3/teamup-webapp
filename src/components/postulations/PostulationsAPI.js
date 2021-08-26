import axios from "axios";

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "postulations";
const API_VERSION = "v1";

export async function getPostulationsByProjectId(id) {
  let postulations = [];
  try {
    const { data } = await axios.get(
      `${API_HOST}/api/${API_VERSION}/${API_NAME}?projectId=${id}`
    );
    postulations = data;
    return postulations;
  } catch (error) {
    return postulations;
  }
}
