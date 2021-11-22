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
  currentTurn: number;
  movesCount: number;
  currentSettings: IGameSettings;
}

export interface IGameSettings {
  size: number;
  players: number;
}

export interface IPlayer {
  points: number;
  name: string;
}

export interface IColors {
  primary: string;
  secondary: string;
  grey: string;
  neutral: string;
}

export interface ITheme {
  colors: IColors;
}
