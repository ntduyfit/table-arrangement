import { createContext, ReactNode, useEffect, useMemo, useReducer } from 'react';
import axios from 'axios';

import { TableReducer } from './reducer';
import { ITableContext } from './types';
import { InitTable } from './constants';

const initialState: ITableContext = {
  history: [[]],
  selectedId: 0,
  currentStep: 0,
  dispatch: () => {}
};

const TableContext = createContext<ITableContext>(initialState);

export const TableContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TableReducer, initialState);

  useEffect(() => {
    (async () => {
      const { data: tables } = await axios.get('https://6209dc7192946600171c554f.mockapi.io/tables');
      dispatch({ type: InitTable, payload: tables });
    })();
  }, []);

  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export default TableContext;
