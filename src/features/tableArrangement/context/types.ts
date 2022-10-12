import { Dispatch } from 'react';

import { ITable } from '../../../types/table';

export interface ITableReducer {
  history: Array<Array<ITable>>;
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
