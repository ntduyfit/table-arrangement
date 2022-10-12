import { Dispatch } from 'react';

import { ICircleTable, IRectangleTable } from '../../../types/table';

export interface ITableReducer {
  history: Array<Array<IRectangleTable | ICircleTable>>;
  selectedId: number;
  currentStep: number;
}

export interface IReducerAction {
  type: string;
  payload?: unknown;
}

export interface ITableContext extends ITableReducer {
  dispatch: Dispatch<IReducerAction>;
}
