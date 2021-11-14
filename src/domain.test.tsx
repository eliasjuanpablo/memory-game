import { GameManager, generateCells } from "./domain";
import { CellStatus } from "./types";

const _ = require("lodash");

describe("cells generation", () => {
  it("should have proper size", () => {
    const size = 4;
    expect(generateCells(size)).toHaveLength(size * size);
  });

  it("should have values repeated twice", () => {
    const result = generateCells();
    const counts = _.countBy(result.map((v) => v.value));
    expect(Object.values(counts).every((c) => c === 2)).toBe(true);
  });

  // TODO: test it's shuffled
  // TODO: maybe this is a private method

  it("should have proper initial state", () => {
    const result = generateCells();
    const statuses = result.map((c) => c.status);
    expect(statuses.every((s) => s === CellStatus.Hidden)).toBe(true);
  });
});

describe("game manager initialization", () => {
  it("initializes private variables properly", () => {
    const gm = new GameManager();
    const { cells, finished } = gm.state;
    expect(cells).not.toBeUndefined();
    expect(finished).not.toBeUndefined();
  });
});

describe("game manager plays", () => {
  it("selects a cell when nothing is selected", () => {
    const gm = new GameManager();
    const index = 0;
    const { cells } = gm.selectCell(index);
    expect(cells[index].status).toBe(CellStatus.Selected);
    expect(cells.filter((c) => c.status === CellStatus.Selected)).toHaveLength(
      1
    );
  });

  it("reveals cells when matched", () => {
    const gm = new GameManager();
    const firstCell = gm["cells"][0];
    firstCell.status = CellStatus.Selected;
    const matchingIndex =
      gm["cells"].slice(1).findIndex((c) => c.value === firstCell.value) + 1;

    const { cells } = gm.selectCell(matchingIndex);
    const revealedCells = cells.filter((c) => c.status === CellStatus.Revealed);
    expect(revealedCells).toHaveLength(2);
    expect(cells[0].status).toEqual(CellStatus.Revealed);
    expect(cells[matchingIndex].status).toEqual(CellStatus.Revealed);
  });

  it("hides cells when different", () => {
    const gm = new GameManager();
    const firstCell = gm["cells"][0];
    firstCell.status = CellStatus.Selected;
    const unmatchedIndex =
      gm["cells"].slice(1).findIndex((c) => c.value !== firstCell.value) + 1;

    const { cells } = gm.selectCell(unmatchedIndex);

    expect(cells[0].status).toEqual(CellStatus.Hidden);
    expect(cells[unmatchedIndex].status).toEqual(CellStatus.Hidden);
  });
});
