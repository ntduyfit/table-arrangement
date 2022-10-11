import { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';

import { redo, undo } from '../../features/tableArrangement/reducer';
import useAddTableHistory from '../../features/tableArrangement/hooks/useAddTableHistory';
import { AppState } from '../../store';
import useToggle from '../../hooks/useToggle';
import TableInfoForm from '../tableInfoForm';
import { StageSize } from '../canvasStage/constants';
import { Mode } from './constants';
import { ITable } from '../../types/table';

const TableModal = lazy(() => import('../tableModal'));

const initialTable: ITable = {
  id: Math.round(Math.random() * (10000 - 1)),
  width: 100,
  height: 60,
  position: {
    x: StageSize.width / 2 - 50,
    y: StageSize.height / 2 - 35
  },
  name: '',
  pax: 4
};

const Toolbox = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedId, currentStep, history } = useSelector((state: AppState) => state.tables);
  const { addTable, removeTable, updateTableHistory } = useAddTableHistory();
  const [targetTable, setTargetTable] = useState(initialTable);

  const [mode, setMode] = useState(Mode.add);

  const [isOpenModal, showModal, closeModal] = useToggle();

  const submitAddTable = (newTable: ITable) => {
    switch (mode) {
      case Mode.add:
        addTable({
          ...newTable,
          id: Math.round(Math.random() * (10000 - 1)),
          width: 160,
          height: 70,
          position: {
            x: StageSize.width / 2 - 50,
            y: StageSize.height / 2 - 35
          }
        });
        break;
      case Mode.edit:
        updateTableHistory(newTable);
        break;

      default:
        break;
    }

    closeModal();
  };

  const changeToAddMode = () => {
    setMode(Mode.add);
    setTargetTable({ ...initialTable });
    showModal();
  };

  const changeToEditMode = () => {
    setMode(Mode.edit);
    const selectedTable = history[currentStep].find((table) => table.id === selectedId);
    setTargetTable({ ...selectedTable! });
    showModal();
  };

  return (
    <Box display='flex' sx={{ '--IconButton-margin': '8px' }}>
      <Tooltip title='Add a new table'>
        <IconButton variant='solid' onClick={changeToAddMode}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Remove selected table'>
        <span>
          <IconButton variant='solid' onClick={() => removeTable()} disabled={!selectedId}>
            <RemoveIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Undo last step'>
        <IconButton variant='solid' onClick={() => dispatch(undo())}>
          <UndoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Redo next step'>
        <IconButton variant='solid' onClick={() => dispatch(redo())}>
          <RedoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit selected table'>
        <span>
          <IconButton variant='solid' onClick={changeToEditMode} disabled={!selectedId}>
            <MoreHorizIcon />
          </IconButton>
        </span>
      </Tooltip>
      <TableModal isOpen={isOpenModal} handleClose={closeModal}>
        <TableInfoForm submitAddTable={submitAddTable} targetTable={targetTable} isEdit={mode === Mode.edit} />
      </TableModal>
    </Box>
  );
};

export default Toolbox;
