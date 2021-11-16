export enum CellStatus {
  Hidden,
  Selected,
  Revealed,
}

export interface ICell {
  value: number;
  status: CellStatus;
}

export interface IGameState {
  cells: ICell[];
  finished: boolean;
  players: IPlayer[];
}

export interface IGameSettings {
  size?: number;
  players?: number;
}

export interface IPlayer {
  points: number;
}
