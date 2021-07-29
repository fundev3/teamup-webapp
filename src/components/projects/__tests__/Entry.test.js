import Entry from "../Entry";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

function renderEntryWithIdProject() {
  const history = createMemoryHistory();
  const route = "/projects/entry?id=7878";
  history.push(route);
  return render(
    <Router history={history}>
      <Entry />
    </Router>
  );
}

function renderEntryWithoutIdProject() {
  const history = createMemoryHistory();
  const route = "/projects/entry";
  history.push(route);
  return render(
    <Router history={history}>
      <Entry />
    </Router>
  );
}

describe("Entry", () => {
  afterAll(() => {
    cleanup();
  });
  test("Should render Entry component", () => {
    renderEntryWithIdProject();
    screen.debug();
  });

  test("Should render title create without id project on url", () => {
    renderEntryWithoutIdProject();
    const title = screen.getByText("Create Project");
    expect(title).toBeInTheDocument();
  });

  test("Should render button create", () => {
    renderEntryWithoutIdProject();
    const button = screen.getByTestId("btn-form");
    expect(button).toHaveTextContent("Create");
    screen.debug(button);
  });

  test("Should render title update with id project on url", () => {
    renderEntryWithIdProject();
    const title = screen.getByText("Update Project");
    expect(title).toBeInTheDocument();
  });

  test("Should render button update", () => {
    renderEntryWithIdProject();
    const button = screen.getByTestId("btn-form");
    expect(button).toHaveTextContent("Update");
    screen.debug(button);
  });

  test("Should render subtitle", () => {
    renderEntryWithoutIdProject();
    const subTitle = screen.getByText(
      "Make your project know and hire the best resumes for it."
    );
    expect(subTitle).toBeInTheDocument();
  });

  test("Should render 6 inputs in form", () => {
    renderEntryWithoutIdProject();
    const test = screen.getAllByTestId("input-field");
    // screen.debug(test);
    expect(test.length).toBeGreaterThanOrEqual(6);
  });
});
