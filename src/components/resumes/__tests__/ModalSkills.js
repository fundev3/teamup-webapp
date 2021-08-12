import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-dom";

var mock = new MockAdapter(axios);

const id = "40b3f7e3-eaba-4b0f-bbef-5f5882af3ced";

// const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_HOST = "https://fa-tuapi-resumes-dev-bra.azurewebsites.net";
const API_NAME = "resumes";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}`;

const resume = [
  { id: "184bf2b8-abc1-47da-b383-d0e05ca57d4d", name: "C#" },
  { id: "0947a444-09c6-4281-894a-5e7a4acc38eb", name: "API" },
  { id: "2147a444-09c6-4281-894a-5e7a4acc38eb", name: ".NET" },
];

test("Should get name Skill", async () => {
  mock.onGet(url).reply(200, resume);
  const response = await axios.get(url);
  expect(response.data).toEqual(resume);
  expect(response.status).toBe(200);
});

test("Should return error 404", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(url).reply(404);
  let error;
  try {
    await axios.get(url);
  } catch (e) {
    error = e.response;
  }
  expect(error.status).toBe(404);
});

test("Should return bad request error", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(url).reply(400);
  let error;
  try {
    await axios.get(url);
  } catch (e) {
    error = e.response;
  }
  expect(error.status).toBe(400);
});
