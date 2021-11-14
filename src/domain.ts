import { CellStatus, ICell } from "./types";

export function generateCells(size: number = 4): ICell[] {
  const values = [...Array(size * 2).keys(), ...Array(size * 2).keys()];
  return values.map((value) => ({ value, status: CellStatus.Hidden }));
}
