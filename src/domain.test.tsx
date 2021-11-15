import countBy from "lodash/countBy";

import { GameManager } from "./domain";
import { CellStatus } from "./types";

describe("cells generation", () => {
  it("should have proper size", () => {
    const gm = new GameManager();
    const size = 4;
    expect(gm["generateCells"](size)).toHaveLength(size * size);
  });

  it("should have values repeated twice", () => {
    const gm = new GameManager();
    const result = gm["generateCells"]();
    const counts = countBy(result.map((v) => v.value));
    expect(Object.values(counts).every((c) => c === 2)).toBe(true);
  });

  it("should be shuffled", () => {
    // not the best check but as soon as it's not "sorted" it's ok
    const gm = new GameManager();
    const size = 4;
    const result = gm["generateCells"](size);
    expect(result.map((c) => c.value)).not.toBe([
      0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("should have proper initial state", () => {
    const gm = new GameManager();
    const result = gm["generateCells"]();
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

  it("does nothing when matching a cell with itself", () => {
    const gm = new GameManager();
    const firstCell = gm["cells"][0];
    firstCell.status = CellStatus.Selected;
    const originalState = gm.state;
    gm.selectCell(0);
    const newState = gm.state;

    expect(originalState).toEqual(newState);
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

  it("handles game finish", () => {
    const checkWinSpy = jest.spyOn(GameManager.prototype as any, "checkWin");
    const gm = new GameManager();
    gm["cells"] = gm["cells"].slice(0, 2).map((c) => ({ ...c, value: 0 }));
    gm.selectCell(0);
    gm.selectCell(1);
    const { finished } = gm.state;
    expect(finished).toBe(true);
    expect(checkWinSpy).toHaveBeenCalled();
  });
});
