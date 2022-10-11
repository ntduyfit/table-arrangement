import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import { redo, undo } from '../../features/tableArrangement/reducer';
import useAddTableHistory from '../../features/tableArrangement/hooks/useAddTableHistory';
import { AppState } from '../../store';

const Toolbox = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedId } = useSelector((state: AppState) => state.tables);
  const { addTable, removeTable } = useAddTableHistory();

  return (
    <Box display='flex' sx={{ '--IconButton-margin': '8px' }}>
      <IconButton
        variant='solid'
        onClick={() =>
          addTable({
            id: Math.round(Math.random() * (10000 - 1)),
            name: 'New Table',
            width: 100,
            height: 60,
            pax: 6,
            position: {
              x: 100,
              y: 100
            }
          })
        }
      >
        <AddIcon />
      </IconButton>
      <IconButton variant='solid' onClick={() => removeTable()} disabled={!selectedId}>
        <RemoveIcon />
      </IconButton>
      <IconButton variant='solid' onClick={() => dispatch(undo())}>
        <UndoIcon />
      </IconButton>
      <IconButton variant='solid' onClick={() => dispatch(redo())}>
        <RedoIcon />
      </IconButton>
    </Box>
  );
};

export default Toolbox;
