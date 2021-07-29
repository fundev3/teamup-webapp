import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-dom";

describe("TESTING API MOCK", () => {
  test("Should save project with 201", async () => {
    const mock = new MockAdapter(axios);
    const project = {
      contact: {
        idResume: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
      },

      creationDate: "2021-07-29T13:18:01.545Z",
      description: "string",
      logo: "string",
      memberList: [
        {
          idResume: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "string",
        },
      ],
      name: "string",
      textInvitation: "string",
    };
    const route = `${process.env.REACT_APP_API_HOST}/projects`;
    mock.onPost(route).reply(201, project);
    const response = await axios.post(route);
    expect(response.data).toEqual(project);
    expect(response.status).toBe(201);
  });

  test("Should has error to save project", async () => {
    const mock = new MockAdapter(axios);
    const route = `${process.env.REACT_APP_API_HOST}/projects`;
    mock.onPost(route).reply(500);
    let error;
    try {
      await axios.post(route);
    } catch (e) {
      error = e;
    }
    expect(error.message).toContain("500");
  });
});
