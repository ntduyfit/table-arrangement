import { useContext } from 'react';
import { ITable } from '../../../types/table';
import TableContext from '../context';
import { UpdateHistory } from '../context/constants';

interface IReturnTypes {
  updateTableHistory: (table: ITable) => void;

  addTable: (table: ITable) => void;

  removeTable: () => void;
}

const useAddTableHistory = (): IReturnTypes => {
  const { history, currentStep, selectedId, dispatch } = useContext(TableContext);

  const updateTableHistory = (table: ITable) => {
    const currentHistory = [...history[currentStep]];
    const newStep = currentHistory.filter((item) => item.id !== table.id);
    newStep.push(table);

    dispatch({ type: UpdateHistory, payload: newStep });
  };

  const addTable = (table: ITable) => {
    const newStep = [...history[currentStep]];
    newStep.push(table);

    dispatch({ type: UpdateHistory, payload: newStep });
  };

  const removeTable = () => {
    const currentHistory = [...history[currentStep]];
    const newStep = currentHistory.filter((item) => item.id !== selectedId);

    dispatch({ type: UpdateHistory, payload: newStep });
  };

  return { addTable, removeTable, updateTableHistory };
};

export default useAddTableHistory;
