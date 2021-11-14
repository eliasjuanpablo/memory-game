export enum CellStatus {
  Hidden,
}

export interface ICell {
  value: number;
  status: CellStatus;
}

export interface IGameState {
  cells: ICell[];
  selected: number[];
}
