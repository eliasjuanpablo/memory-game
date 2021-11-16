import shuffle from "lodash/shuffle";
import { CellStatus, ICell, IGameState } from "./types";

const DEFAULT_GRID_SIZE = 4;

export class GameManager {
  private cells: ICell[];
  private finished: boolean = false;

  constructor(size: number = DEFAULT_GRID_SIZE) {
    this.cells = this._generateCells(size);
  }

  private _findCellsByStatus(status: CellStatus): ICell[] {
    return this.cells.filter((c) => c.status === status);
  }

  private _generateCells(size: number): ICell[] {
    const values = shuffle([
      ...Array(size * 2).keys(),
      ...Array(size * 2).keys(),
    ]);
    return values.map((value) => ({ value, status: CellStatus.Hidden }));
  }

  private _checkWin(): boolean {
    const revealed = this._findCellsByStatus(CellStatus.Revealed);

    return revealed.length === this.cells.length;
  }

  get state(): IGameState {
    return {
      cells: this.cells,
      finished: this.finished,
    };
  }

  checkMatch(): IGameState {
    const selectedCells = this.cells
      .map((c, index) => ({ ...c, index }))
      .filter((c) => c.status === CellStatus.Selected);
    if (selectedCells.length !== 2) return this.state; // do nothing

    const [c1, c2] = selectedCells;
    if (c1.value === c2.value) {
      this.cells[c1.index].status = CellStatus.Revealed;
      this.cells[c2.index].status = CellStatus.Revealed;
    } else {
      this.cells[c1.index].status = CellStatus.Hidden;
      this.cells[c2.index].status = CellStatus.Hidden;
    }

    if (this._checkWin()) {
      this.finished = true;
    }

    return this.state;
  }

  selectCell(index: number): IGameState {
    const selected = this._findCellsByStatus(CellStatus.Selected);

    if (this.cells[index].status !== CellStatus.Hidden) return this.state;

    if (selected.length < 2) {
      this.cells = this.cells.map((c, i) =>
        i === index ? { ...c, status: CellStatus.Selected } : c
      );
    }

    return this.state;
  }
}
