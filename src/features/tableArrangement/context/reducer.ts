import { IReducerAction, ITableReducer } from './types';
import { InitTable, Redo, SelectTable, Undo, UpdateHistory } from './constants';
import { ITable } from '../../../types/table';

export const TableReducer = (state: ITableReducer, action: IReducerAction): ITableReducer => {
  switch (action.type) {
    case InitTable:
      return {
        ...state,
        history: [[...(action.payload as Array<ITable>)]]
      };

    case UpdateHistory: {
      const history = state.history.splice(0, state.currentStep + 1);
      history.push(action.payload as Array<ITable>);

      return {
        ...state,
        history,
        currentStep: state.currentStep + 1
      };
    }

    case SelectTable:
      return {
        ...state,
        selectedId: action.payload as number
      };

    case Undo:
      return {
        ...state,
        currentStep: state.currentStep - 1
      };

    case Redo:
      return {
        ...state,
        currentStep: state.currentStep + 1
      };
    default:
      return state;
  }
};
