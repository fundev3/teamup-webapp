import Details from "../Details";
import axios from "axios";
import { getResume } from "../ProjectsAPI";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

const stubObject = {
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
  ],
};

const stubId = "5a7939fd-59de-44bd-a092-f5d8434584de";

test("Should return success response", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(stubObject));
  await expect(getResume(stubId)).resolves.toEqual(stubObject.data);
});
