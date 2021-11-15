import shuffle from "lodash/shuffle";
import { CellStatus, ICell, IGameState } from "./types";

export class GameManager {
  private cells: ICell[];
  private finished: boolean = false;

  constructor(size: number = 4) {
    this.cells = this.generateCells(size);
  }

  private generateCells(size: number = 4): ICell[] {
    const values = shuffle([
      ...Array(size * 2).keys(),
      ...Array(size * 2).keys(),
    ]);
    return values.map((value) => ({ value, status: CellStatus.Hidden }));
  }

  private checkWin(): boolean {
    const revealed = this.cells.filter((c) => c.status === CellStatus.Revealed);

    return revealed.length === this.cells.length;
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
      if (index === alreadySelectedIndex) {
        // selected an already selected cell, do nothing
        return this.state;
      }

      let status: CellStatus;

      if (this.cells[index].value === this.cells[alreadySelectedIndex].value) {
        status = CellStatus.Revealed;
      } else {
        status = CellStatus.Hidden;
      }

      this.cells[index].status = status;
      this.cells[alreadySelectedIndex].status = status;

      if (this.checkWin()) {
        this.finished = true;
      }
    }

    return this.state;
  }
}
