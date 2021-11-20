import shuffle from "lodash/shuffle";
import { DEFAULT_SETTINGS } from "./constants";
import { CellStatus, ICell, IGameSettings, IGameState, IPlayer } from "./types";

export class GameManager {
  private cells: ICell[];
  private finished: boolean = false;
  private players: IPlayer[];
  private currentTurn: number = 0;
  private movesCount: number = 0;
  private currentSettings: IGameSettings;

  constructor(settings: Partial<IGameSettings>) {
    const currentSettings = Object.assign(DEFAULT_SETTINGS, settings);

    this.cells = this._generateCells(currentSettings.size);
    this.players = this._generatePlayers(currentSettings.players);
    this.currentSettings = currentSettings;
  }

  private _findCellsByStatus(status: CellStatus): ICell[] {
    return this.cells.filter((c) => c.status === status);
  }

  private _generateCells(size: number): ICell[] {
    const square = size * size;
    const values = shuffle([
      ...Array(square / 2).keys(),
      ...Array(square / 2).keys(),
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
      movesCount: this.movesCount,
      currentSettings: this.currentSettings,
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
      this.players[this.currentTurn].points += 1;
    } else {
      this.cells[c1.index].status = CellStatus.Hidden;
      this.cells[c2.index].status = CellStatus.Hidden;
      this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    if (this._checkWin()) {
      this.finished = true;
    }

    this.movesCount += 1;

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
