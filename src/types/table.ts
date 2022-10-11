export interface IPosition {
  x: number;
  y: number;
}

export interface ITable {
  id: number;
  name: string;
  pax: number;
  position: IPosition;
  width: number;
  height: number;
}
