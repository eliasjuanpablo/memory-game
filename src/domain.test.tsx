import { generateCells } from "./domain";
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

  it("should have proper initial state", () => {
    const result = generateCells();
    const statuses = result.map((c) => c.status);
    expect(statuses.every((s) => s === CellStatus.Hidden)).toBe(true);
  });
});
