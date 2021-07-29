import axios from "axios";
import getResumes from "../ResumesAPI.js";
import ResumeList from "../Resumes";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
jest.mock("axios");

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}`;

const mockData = {
  data: [
    {
      contact: {
        direction: "Tarija Av.",
        email: "rodrigo.baldivieso@fundacion-jala.org",
        phone: 77669911,
      },
      creationDate: "2021-07-18T03:30:03.7173058+00:00",
      id: "dd05d77a-ca64-401a-be39-8e1ea84e2f83",
      lastUpdate: "2021-07-28T03:30:03.7173768+00:00",
      personalInformation: {
        birthdate: "1995-01-01T00:00:00",
        firstName: "Rodrigo",
        lastName: "Baldivieso",
        picture: "?",
      },
      skills: [
        {
          id: "184bf2b8-abc1-47da-b383-d0e05ca57d4d",
          nameSkill: "C#",
        },
        {
          id: "0947a444-09c6-4281-894a-5e7a4acc38eb",
          nameSkill: "API",
        },
      ],
      summary: "Rodrigo's summary",
      title: "My Custom Title",
    },
    {
      contact: {
        direction: "Cochabamba Av.",
        email: "paola.quintanilla@fundacion-jala.org",
        phone: 77669911,
      },
      creationDate: "2021-07-18T03:30:03.7174577+00:00",
      id: "40b3f7e3-eaba-4b0f-bbef-5f5882af3ced",
      lastUpdate: "2021-07-28T03:30:03.717461+00:00",
      personalInformation: {
        birthdate: "1995-01-01T00:00:00",
        firstName: "Paola",
        lastName: "Quintanilla",
        picture: "?",
      },
      skills: [
        {
          id: "184bf2b8-abc1-47da-b383-d0e05ca57d4d",
          nameSkill: "C#",
        },
        {
          id: "0947a444-09c6-4281-894a-5e7a4acc38eb",
          nameSkill: "API",
        },
      ],
      summary: "Paola's summary",
      title: "My Custom Title",
    },
  ],
};

test("should return a resume list", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

  await expect(getResumes()).resolves.toEqual(mockData.data);

  expect(axios.get).toHaveBeenCalledWith(`${url}`);
});

test("should return false", async () => {
  const resolve = true;

  axios.get.mockImplementationOnce(() => Promise.resolve(new Error()));

  expect(getResumes())
    .rejects.toThrow(resolve)
    .then()
    .catch((err) => {});
});

test("Should render Resumes component", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

  render(
    <MemoryRouter initialEntries={[`resumes`]}>
      <Route path="resumes">
        <ResumeList />
      </Route>
    </MemoryRouter>
  );
  const resumesScreen = await screen.findByText("Create Resume");
  expect(resumesScreen).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(url);
});
