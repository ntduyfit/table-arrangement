import { createContext, ReactNode, useMemo, useReducer } from 'react';

import { TableReducer } from './reducer';
import { ITableContext } from './types';

const initialState: ITableContext = {
  history: [[]],
  selectedId: 0,
  currentStep: 0,
  dispatch: () => {}
};

const TableContext = createContext<ITableContext>(initialState);

export const TableContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TableReducer, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export default TableContext;
