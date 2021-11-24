import {
  render as rtlRender,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App, { AppProps } from "./App";
import { GameManager } from "./domain";

function render(props: AppProps = {}) {
  return rtlRender(<App {...props} />);
}

test("renders app without errors", () => {
  render();
});

test("renders grid cells", () => {
  render();
  screen.getByTestId("grid");
  screen.getAllByTestId("cell");
});

test("renders menu", () => {
  render();
  screen.getByText("Restart");
  screen.getByText("New Game");
});

test("reveals cell content when clicked", () => {
  render();
  let allContents = screen.queryAllByTestId("cell-content");
  expect(allContents).toEqual([]);

  const cell = screen.getAllByTestId("cell")[0];
  cell.click();

  allContents = screen.queryAllByTestId("cell-content");
  expect(allContents.length).toBe(1);
});

test("hides cells properly", async () => {
  // make sure cells will never match
  const gm = new GameManager({});
  gm["cells"] = [...Array(16).keys()].map((i) => ({ value: i, status: 0 }));

  render({ gm, checkDelay: 0 });
  const cell1 = screen.getAllByTestId("cell")[0];
  cell1.click();
  const cell2 = screen.getAllByTestId("cell")[1];
  cell2.click();

  await waitForElementToBeRemoved(() =>
    screen.queryAllByTestId("cell-content")
  );
});

test("reveals cells properly", async () => {
  // make sure cells will match
  const gm = new GameManager({});
  gm["cells"] = [...Array(16).keys()].map((i) => ({ value: 1, status: 0 }));

  render({ gm, useIcons: true });
  const cell1 = screen.getAllByTestId("cell")[0];
  cell1.click();
  const cell2 = screen.getAllByTestId("cell")[1];
  cell2.click();

  await waitFor(() => {
    screen.getAllByTestId("cell-content");
    screen.getAllByRole("img");
  });
});
