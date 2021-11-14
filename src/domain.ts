import { CellStatus, ICell, IGameState } from "./types";

export function generateCells(size: number = 4): ICell[] {
  const values = [...Array(size * 2).keys(), ...Array(size * 2).keys()];
  return values.map((value) => ({ value, status: CellStatus.Hidden }));
}

export class GameManager {
  private cells: ICell[];
  private selected: number[];

  constructor(size: number = 4) {
    this.cells = generateCells(size);
    this.selected = [];
  }

  get state(): IGameState {
    return { cells: this.cells, selected: this.selected };
  }
}
