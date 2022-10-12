import { lazy } from 'react';
import Box from '@mui/joy/Box';
import { TableContextProvider } from './context';

const Toolbox = lazy(() => import('../../components/toolbox'));
const CanvasStage = lazy(() => import('../../components/canvasStage'));

const TableArrangement = (): JSX.Element => {
  return (
    <TableContextProvider>
      <Box display='flex' flexDirection='column'>
        <Toolbox />
        <CanvasStage />
      </Box>
    </TableContextProvider>
  );
};

export default TableArrangement;
