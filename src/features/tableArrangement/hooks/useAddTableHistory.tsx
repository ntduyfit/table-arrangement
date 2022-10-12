import { useContext } from 'react';
import { ICircleTable, IRectangleTable } from '../../../types/table';
import TableContext from '../context';
import { UpdateHistory } from '../context/constants';

interface IReturnTypes {
  updateTableHistory: (table: IRectangleTable | ICircleTable) => void;

  addTable: (table: IRectangleTable | ICircleTable) => void;

  removeTable: () => void;
}

const useAddTableHistory = (): IReturnTypes => {
  const { history, currentStep, selectedId, dispatch } = useContext(TableContext);

  const updateTableHistory = (table: IRectangleTable | ICircleTable) => {
    const currentHistory = [...history[currentStep]];
    const newStep = currentHistory.filter((item) => item.id !== table.id);
    newStep.push(table);

    dispatch({ type: UpdateHistory, payload: newStep });
  };

  const addTable = (table: IRectangleTable | ICircleTable) => {
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
