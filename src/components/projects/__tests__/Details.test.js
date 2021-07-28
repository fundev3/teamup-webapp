import Details from "../Details";
import axios from "axios";
import { getProject } from "../ProjectsAPI";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockData = {
  data: {
    contact: {
      idResume: "5a7939fd-59de-44bd-a092-f5d8434584de",
      name: "Jose Ecos",
    },
    creationDate: "2021-07-18T00:00:00+00:00",
    description: "Centralize resumes and project",
    id: "5a7939fd-59de-44bd-a092-f5d8434584de",
    logo: "https://www.example.com/images/dinosaur.jpg",
    memberList: [
      {
        idResume: "536316e6-f8f6-41ea-b1ce-455b92be9303",
        name: "Paola Quintanilla",
      },
    ],
    name: "TeamUp",
    state: true,
    textInvitation: "You are invited to be part of TeamUp",
  },
};

const mockId = "5a7939fd-59de-44bd-a092-f5d8434584de";

const API_HOST = process.env.REACT_APP_API_HOST;
const API_NAME = "projects";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}/${mockId}`;

test("should return successfully data from an API", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

  await expect(getProject(mockId)).resolves.toEqual(mockData.data);
});

test("Should handle API error", async () => {
  const handlerError = true;
  axios.get.mockImplementationOnce(() => Promise.reject(new Error("Fail")));

  const jsdomAlert = window.alert;
  window.alert = () => {};

  const result = await getProject(mockId);
  expect(result).toEqual(handlerError);

  window.alert = jsdomAlert;
});

test("Should render Details component", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

  render(
    <MemoryRouter initialEntries={[`projects/${mockId}`]}>
      <Route path="projects/:id">
        <Details />
      </Route>
    </MemoryRouter>
  );
  const projectName = await screen.findByText("Project: TeamUp");
  expect(projectName).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(url);
});
