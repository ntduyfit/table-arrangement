import { lazy, useContext, useState } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';

import useAddTableHistory from '../../features/tableArrangement/hooks/useAddTableHistory';
import useToggle from '../../hooks/useToggle';
import TableInfoForm from '../tableInfoForm';
import { StageSize } from '../canvasStage/constants';
import { Mode } from './constants';
import { IRectangleTable } from '../../types/table';
import TableContext from '../../features/tableArrangement/context';
import { Redo, Undo } from '../../features/tableArrangement/context/constants';

const TableModal = lazy(() => import('../tableModal'));

const initialTable: IRectangleTable = {
  id: Math.round(Math.random() * (10000 - 1)),
  name: '',
  number_of_pax: 4,
  type: 'rectangle',
  shape: {
    width: 100,
    height: 60,
    pos_x: StageSize.width / 2 - 50,
    pos_y: StageSize.height / 2 - 35
  }
};

const Toolbox = (): JSX.Element => {
  const { selectedId, currentStep, history, dispatch } = useContext(TableContext);
  const { addTable, removeTable, updateTableHistory } = useAddTableHistory();
  const [targetTable, setTargetTable] = useState(initialTable);

  const [mode, setMode] = useState(Mode.add);

  const [isOpenModal, showModal, closeModal] = useToggle();

  const submitAddTable = (newTable: IRectangleTable) => {
    switch (mode) {
      case Mode.add:
        addTable({
          ...newTable,
          id: Math.round(Math.random() * (10000 - 1)),
          shape: {
            width: 160,
            height: 70,
            pos_x: StageSize.width / 2 - 50,
            pos_y: StageSize.height / 2 - 35
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
    setTargetTable({ ...(selectedTable! as IRectangleTable) });
    showModal();
  };

  const handleSave = () => {
    console.log(history[currentStep]);
  };

  return (
    <Box display='flex' sx={{ '--IconButton-margin': '8px' }} width={1200}>
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
        <span>
          <IconButton variant='solid' onClick={() => dispatch({ type: Undo })} disabled={currentStep < 1}>
            <UndoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Redo next step'>
        <span>
          <IconButton variant='solid' onClick={() => dispatch({ type: Redo })} disabled={currentStep >= history.length - 1}>
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Edit selected table'>
        <span>
          <IconButton variant='solid' onClick={changeToEditMode} disabled={!selectedId}>
            <MoreHorizIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Box flexGrow={1} display='flex' justifyContent='flex-end'>
        <Button size='sm' sx={{ margin: 1 }} onClick={handleSave}>
          Save
        </Button>
      </Box>
      <TableModal isOpen={isOpenModal} handleClose={closeModal}>
        <TableInfoForm submitAddTable={submitAddTable} targetTable={targetTable} isEdit={mode === Mode.edit} />
      </TableModal>
    </Box>
  );
};

export default Toolbox;
