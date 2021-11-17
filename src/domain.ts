import shuffle from "lodash/shuffle";
import { CellStatus, ICell, IGameSettings, IGameState, IPlayer } from "./types";

const DEFAULT_GRID_SIZE = 4;

export class GameManager {
  private cells: ICell[];
  private finished: boolean = false;
  private players: IPlayer[];
  private currentTurn: number = 0;

  constructor(settings: IGameSettings = {}) {
    this.cells = this._generateCells(settings.size || DEFAULT_GRID_SIZE);
    this.players = this._generatePlayers(settings.players || 1);
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

  private _generatePlayers(players: number): IPlayer[] {
    return [...Array(players).keys()].map(() => ({
      points: 0,
    }));
  }

  private _checkWin(): boolean {
    const revealed = this._findCellsByStatus(CellStatus.Revealed);

    return revealed.length === this.cells.length;
  }

  get state(): IGameState {
    return {
      cells: this.cells,
      finished: this.finished,
      players: this.players,
      currentTurn: this.currentTurn,
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

    this.currentTurn = (this.currentTurn + 1) % this.players.length;

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
