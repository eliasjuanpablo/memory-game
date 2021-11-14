import { CellStatus, ICell, IGameState } from "./types";

export function generateCells(size: number = 4): ICell[] {
  const values = [...Array(size * 2).keys(), ...Array(size * 2).keys()];
  return values.map((value) => ({ value, status: CellStatus.Hidden }));
}

export class GameManager {
  private cells: ICell[];
  private finished: boolean = false;

  constructor(size: number = 4) {
    this.cells = generateCells(size);
  }

  get state(): IGameState {
    return {
      cells: this.cells,
      finished: this.finished,
    };
  }

  selectCell(index: number): IGameState {
    const selected = this.cells.filter((c) => c.status === CellStatus.Selected);
    if (selected.length === 0) {
      this.cells = this.cells.map((c, i) =>
        i === index ? { ...c, status: CellStatus.Selected } : c
      );
    }
    if (selected.length === 1) {
      const alreadySelectedIndex = this.cells.findIndex(
        (c) => c.status === CellStatus.Selected
      );
      if (this.cells[index].value === this.cells[alreadySelectedIndex].value) {
        this.cells[index].status = CellStatus.Revealed;
        this.cells[alreadySelectedIndex].status = CellStatus.Revealed;
      } else {
        this.cells[index].status = CellStatus.Hidden;
        this.cells[alreadySelectedIndex].status = CellStatus.Hidden;
      }
    }

    return this.state;
  }
}
