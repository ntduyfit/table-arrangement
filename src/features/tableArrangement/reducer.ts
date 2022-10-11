import { createSlice } from '@reduxjs/toolkit';
import { ITable } from '../../types/table';

export interface ITableSliceType {
  history: Array<Array<ITable>>;
  currentStep: number;
  selectedId: number;
}

const initialState: ITableSliceType = {
  history: [[]],
  currentStep: 0,
  selectedId: 0
};

const tableSlice = createSlice({
  initialState,
  name: 'TableSlice',
  reducers: {
    init: (state, action) => {
      state.history = [action.payload];
    },
    updateTable: (state, action) => {
      const history = state.history.splice(0, state.currentStep + 1);
      history.push(action.payload);
      state.currentStep += 1;
      state.history = history;
    },
    undo: (state) => {
      if (state.currentStep > 0) state.currentStep -= 1;
    },
    redo: (state) => {
      if (state.currentStep < state.history.length - 1) state.currentStep += 1;
    },
    selectTable: (state, action) => {
      state.selectedId = action.payload;
    }
  }
});

export default tableSlice.reducer;

export const { init, redo, selectTable, undo, updateTable } = tableSlice.actions;
