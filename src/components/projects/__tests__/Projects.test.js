import axios from "axios";
import { getProjects } from "../ProjectsAPI";

import "@testing-library/jest-dom";

jest.mock("axios");

const mockData = {
  data: [
    {
      contact: {
        idResume: "5a7939fd-59de-44bd-a092-f5d8434584de",
        name: "Jose Ecos",
      },
      creationDate: "2021-07-18T00:00:00+00:00",
      description: "Centralize resumes and project",
      id: "5a7939fd-59de-44bd-a092-f5d8434584de",
      name: "TeamUp",
    },
    {
      contact: {
        idResume: "5a7939fd-59de-44bd-a092-f5d8434584de",
        name: "Jose Ecos",
      },
      creationDate: "2021-07-23T00:00:00+00:00",
      description:
        "Molestiae numquam possimus sit delectus.Sit ut consequatur est magni." +
        "Dolorem voluptatum et distinctio omnis et sit et." +
        "Ea soluta optio saepe ea voluptatem pariatur voluptas qui nihil.",
      id: "5a7939fd-59de-44bd-a092-f5d8434584de",
      name: "Lueilwitz Group",
    },
  ],
};

const API_HOST = process.env.REACT_APP_API_PROJECTS_URL;
const API_NAME = "projects";
const API_VERSION = "v1";
const url = `${API_HOST}/api/${API_VERSION}/${API_NAME}`;

test("should return sucessfully data from an API", async () => {
  axios.get.mockImplementation(() => Promise.resolve(mockData));
  await expect(getProjects()).resolves.toEqual(mockData.data);
  expect(axios.get).toHaveBeenLastCalledWith(`${url}`);
});

test("should handle API error", async () => {
  // TODO error handling
  axios.get.mockImplementation(() => Promise.reject(new Error("Fail")));

  const jsdomAlert = window.alert;
  window.alert = () => {};
  await getProjects(mockData);

  window.alert = jsdomAlert;
});
