import countBy from "lodash/countBy";

import { GameManager } from "./domain";
import { CellStatus, IGameState } from "./types";

function makePlay(gm: GameManager, cells: number[]): IGameState {
  gm.selectCell(cells[0]);
  gm.selectCell(cells[1]);
  return gm.checkMatch();
}

function makeMatch(gm: GameManager): IGameState {
  const { cells } = gm.state;
  const firstHiddenIndex = cells.findIndex(
    (c) => c.status === CellStatus.Hidden
  );
  const matchingCellIndex = cells.findIndex(
    (c, index) =>
      index !== firstHiddenIndex && c.value === cells[firstHiddenIndex].value
  );

  return makePlay(gm, [firstHiddenIndex, matchingCellIndex]);
}

function makeUnmatch(gm: GameManager): IGameState {
  const { cells } = gm.state;
  const firstHiddenIndex = cells.findIndex(
    (c) => c.status === CellStatus.Hidden
  );
  const unmatchingCellIndex = cells.findIndex(
    (c, index) =>
      index !== firstHiddenIndex &&
      c.status === CellStatus.Hidden &&
      c.value !== cells[firstHiddenIndex].value
  );

  return makePlay(gm, [firstHiddenIndex, unmatchingCellIndex]);
}

describe("cells generation", () => {
  it("should have proper size", () => {
    const gm = new GameManager();
    const size = 4;
    expect(gm["_generateCells"](size)).toHaveLength(size * size);
  });

  it("should have values repeated twice", () => {
    const gm = new GameManager();
    const result = gm["_generateCells"](4);
    const counts = countBy(result.map((v) => v.value));
    expect(Object.values(counts).every((c) => c === 2)).toBe(true);
  });

  it("should be shuffled", () => {
    // not the best check but as soon as it's not "sorted" it's ok
    const gm = new GameManager();
    const result = gm["_generateCells"](4);
    expect(result.map((c) => c.value)).not.toBe([
      0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("should initialize cells properly", () => {
    const gm = new GameManager();
    const statuses = gm.state.cells.map((c) => c.status);
    expect(statuses.every((s) => s === CellStatus.Hidden)).toBe(true);
  });
});

describe("game manager initialization", () => {
  it("initializes private variables properly", () => {
    const gm = new GameManager();
    const { cells, finished, players } = gm.state;
    expect(cells).not.toBeUndefined();
    expect(finished).not.toBeUndefined();
    expect(players).not.toBeUndefined();
  });
});

describe("players handling", () => {
  it("should initialize players properly", () => {
    const gm = new GameManager({ players: 2 });
    const { players } = gm.state;
    expect(players.length).toBe(2);
    expect(players.every((p) => p.points === 0)).toBe(true);
  });

  it("should track current turn for a single player", () => {
    const gm = new GameManager();
    expect(gm.state.currentTurn).toBe(0);

    expect(makeUnmatch(gm).currentTurn).toBe(0);
  });

  it("should track current turn for multiple players", () => {
    const gm = new GameManager({ players: 2 });
    expect(gm.state.currentTurn).toBe(0);
    expect(makeUnmatch(gm).currentTurn).toBe(1);
    expect(makeUnmatch(gm).currentTurn).toBe(0);
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

    gm.selectCell(matchingIndex);
    const { cells } = gm.checkMatch();
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

    gm.selectCell(unmatchedIndex);
    const { cells } = gm.checkMatch();

    expect(cells[0].status).toEqual(CellStatus.Hidden);
    expect(cells[unmatchedIndex].status).toEqual(CellStatus.Hidden);
  });

  it("handles game finish", () => {
    const checkWinSpy = jest.spyOn(GameManager.prototype as any, "_checkWin");
    const gm = new GameManager();
    gm["cells"] = gm["cells"].slice(0, 2).map((c) => ({ ...c, value: 0 }));
    makePlay(gm, [0, 1]);
    const { finished } = gm.state;
    expect(finished).toBe(true);
    expect(checkWinSpy).toHaveBeenCalled();
  });
});

describe("players scoring", () => {
  it("should increase when matching cells", () => {
    const gm = new GameManager();
    expect(gm.state.players[0].points).toBe(0);
    makeMatch(gm);
    expect(gm.state.players[0].points).toBe(1);
  });
  it("should only increase for current player", () => {
    const gm = new GameManager({ players: 2 });
    makeMatch(gm);
    expect(gm.state.players[0].points).toBe(1);
    expect(gm.state.players[1].points).toBe(0);
  });
});

describe("moves counter", () => {
  it("should track every move", () => {
    const gm = new GameManager();
    makeUnmatch(gm);
    makeUnmatch(gm);
    makeMatch(gm);
    expect(gm.state.movesCount).toBe(3);
  });
});
