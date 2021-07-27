import { BrowserRouter } from "react-router-dom";
import Details from "../Details";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("should render loading in Details component", () => {
  render(
    <BrowserRouter>
      <Details />
    </BrowserRouter>
  );
  const loading = screen.getByText("Loading");
  expect(loading).toBeInTheDocument();
});

/* beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test("should render Project Details component", async () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: "5a7939fd-59de-44bd-a092-f5d8434584de",
    }),
    useRouteMatch: () => ({ url: "/projects/id" }),
  }));
  render(
    <BrowserRouter>
      <Details />
    </BrowserRouter>
  );

  expect(
    await screen.findByText("Project: TeamUp", {}, { timeout: 3000 })
  ).toBeInTheDocument();
}); */
