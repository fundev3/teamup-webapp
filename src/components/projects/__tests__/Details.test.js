import Details from "../Details";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { projects } from "../fixtures";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockId = "5a7939fd-59de-44bd-a092-f5d8434584de";

const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "projects";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}/${mockId}`;

test("should render details component", async () => {
  const fakeProject = projects[0];
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { ...fakeProject } })
  );

  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`projects/${mockId}`]}>
        <Route path="projects/:id">
          <Details />
        </Route>
      </MemoryRouter>
    );
  });

  expect(axios.get).toHaveBeenCalledWith(url);
  expect(screen.getByText(`Project: ${fakeProject.name}`)).toBeInTheDocument();
});
