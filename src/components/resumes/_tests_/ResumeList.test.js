import axios from "axios";
import "@testing-library/jest-dom";
import getResumes from "../ResumesAPI.js";
jest.mock("axios");

const mockData = {
  data: [
    {
      id: "dd05d77a-ca64-401a-be39-8e1ea84e2f83",
      title: "My Custom Title",
      personalInformation: {
        firstName: "Rodrigo",
        lastName: "Baldivieso",
        birthdate: "1995-01-01T00:00:00",
        picture: "?",
      },
      contact: {
        direction: "Tarija Av.",
        email: "rodrigo.baldivieso@fundacion-jala.org",
        phone: 77669911,
      },
      summary: "Rodrigo's summary",
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
      creationDate: "2021-07-18T03:30:03.7173058+00:00",
      lastUpdate: "2021-07-28T03:30:03.7173768+00:00",
    },
    {
      id: "40b3f7e3-eaba-4b0f-bbef-5f5882af3ced",
      title: "My Custom Title",
      personalInformation: {
        firstName: "Paola",
        lastName: "Quintanilla",
        birthdate: "1995-01-01T00:00:00",
        picture: "?",
      },
      contact: {
        direction: "Cochabamba Av.",
        email: "paola.quintanilla@fundacion-jala.org",
        phone: 77669911,
      },
      summary: "Paola's summary",
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
      creationDate: "2021-07-18T03:30:03.7174577+00:00",
      lastUpdate: "2021-07-28T03:30:03.717461+00:00",
    },
  ],
};

const API = "http://localhost:7071/api/v1/resumes";

test("should return a resume list", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

  await expect(getResumes()).resolves.toEqual(mockData.data);

  expect(axios.get).toHaveBeenCalledWith(`${API}`);
});

test("should return false", async () => {
  const resolve = { ok: false };

  axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

  expect(getResumes()).rejects.toThrow(resolve);
});
