import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { updateTable } from '../reducer';
import { ITable } from '../../../types/table';

interface IReturnTypes {
  updateTableHistory: (table: ITable) => void;

  addTable: (table: ITable) => void;

  removeTable: () => void;
}

const useAddTableHistory = (): IReturnTypes => {
  const { history, currentStep, selectedId } = useSelector((state: AppState) => state.tables);
  const dispatch = useDispatch();

  const updateTableHistory = (table: ITable) => {
    const currentHistory = [...history[currentStep]];
    const newStep = currentHistory.filter((item) => item.id !== table.id);
    newStep.push(table);

    dispatch(updateTable(newStep));
  };

  const addTable = (table: ITable) => {
    const currentHistory = [...history[currentStep]];
    currentHistory.push(table);

    dispatch(updateTable(currentHistory));
  };

  const removeTable = () => {
    const currentHistory = [...history[currentStep]];
    const newStep = currentHistory.filter((item) => item.id !== selectedId);

    dispatch(updateTable(newStep));
  };

  return { updateTableHistory, addTable, removeTable };
};

export default useAddTableHistory;
