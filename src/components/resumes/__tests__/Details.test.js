import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-dom";

var mock = new MockAdapter(axios);

const id = "40b3f7e3-eaba-4b0f-bbef-5f5882af3ced";

const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}/${id}`;

const resume = [
  {
    contact: {
      address: "Cochabamba Av.",
      email: "paola.quintanilla@fundacion-jala.org",
      phone: 77669911,
    },
    creationDate: "2021-07-21T23:49:28.0933608+00:00",
    id: "40b3f7e3-eaba-4b0f-bbef-5f5882af3ced",
    lastUpdate: "2021-07-31T23:49:28.0933634+00:00",
    person: {
      birthdate: "1995-01-01T00:00:00",
      firstName: "Paola",
      lastName: "Quintanilla",
      picture: "?",
    },
    skills: [
      { id: "184bf2b8-abc1-47da-b383-d0e05ca57d4d", nameSkill: "C#" },
      { id: "0947a444-09c6-4281-894a-5e7a4acc38eb", nameSkill: "API" },
    ],
    summary: "Paola's summary",
    title: "My Custom Title",
  },
];

test("Should get resume by Id with success response", async () => {
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
