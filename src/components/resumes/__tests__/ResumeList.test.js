import Resumes from "../Resumes";
import axios from "axios";
import { getResumes } from "../ResumesAPI.js";
import { resumes } from "../fixtures";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

const API_HOST = process.env.REACT_APP_API_RESUMES_URL;
const API_NAME = "resumes";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}`;

test("should return an empty list", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));

  await expect(getResumes()).resolves.toEqual([]);
});

test("Should render Resumes component", async () => {
  const fakeResumes = resumes;
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: fakeResumes })
  );

  render(
    <MemoryRouter initialEntries={[`/resumes`]}>
      <Route path="/resumes">
        <Resumes />
      </Route>
    </MemoryRouter>
  );
  expect(
    await screen.findByText(fakeResumes[0].contact.email)
  ).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(url);
});

test("Should render a button to create a resume", async () => {
  render(
    <MemoryRouter initialEntries={[`/resumes`]}>
      <Route path="/resumes">
        <Resumes />
      </Route>
    </MemoryRouter>
  );

  const resumesScreen = await screen.findByText("Create Resume");
  expect(resumesScreen).toBeInTheDocument();
});
