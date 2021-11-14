export enum CellStatus {
  Hidden,
}

export interface ICell {
  value: number;
  status: CellStatus;
}
