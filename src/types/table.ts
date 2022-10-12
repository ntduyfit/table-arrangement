export interface IPosition {
  x: number;
  y: number;
}

export interface ITable {
  id: number;
  name: string;
  number_of_pax: number;
  type: 'rectangle' | 'circle';
}

export interface IRectangle {
  pos_x: number;
  pos_y: number;
  width: number;
  height: number;
}

export interface ICircle {
  pos_x: number;
  pos_y: number;
  radius: number;
}

export interface IRectangleTable extends ITable {
  shape: IRectangle;
}

export interface ICircleTable extends ITable {
  shape: ICircle;
}
