import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';

import { init } from './reducer';
import { ITable } from '../../types/table';

const Toolbox = lazy(() => import('../../components/toolbox'));
const CanvasStage = lazy(() => import('../../components/canvasStage'));

const TableArrangement = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tables: Array<ITable> = [{ name: 'Table 1', pax: 10, position: { x: 10, y: 20 }, height: 70, width: 160, id: 1 }];

    dispatch(init(tables));
  }, []);

  return (
    <Box display='flex' flexDirection='column'>
      <Toolbox />
      <CanvasStage />
    </Box>
  );
};

export default TableArrangement;
