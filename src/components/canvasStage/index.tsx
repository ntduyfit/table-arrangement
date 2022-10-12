import { useContext, useEffect } from 'react';
import { Layer } from 'react-konva';

import { StyledStage } from './styles';
import { StageSize } from './constants';
import RectangleTable from '../rectangleTable';
import TableContext from '../../features/tableArrangement/context';
import { InitTable, SelectTable } from '../../features/tableArrangement/context/constants';
import { ITable } from '../../types/table';

const CanvasStage = () => {
  const { currentStep, history, dispatch } = useContext(TableContext);

  useEffect(() => {
    const tables: Array<ITable> = [{ name: 'Table 1', pax: 10, pos_x: 10, pos_y: 20, height: 70, width: 160, id: 1 }];
    dispatch({ type: InitTable, payload: tables });
  }, []);

  const handleClick = () => {
    dispatch({ type: SelectTable, payload: 0 });
  };

  return (
    <StyledStage width={StageSize.width} height={StageSize.height} onClick={handleClick}>
      <Layer>
        {history[currentStep]?.map((table) => (
          <RectangleTable key={table.name} table={table} />
        ))}
      </Layer>
    </StyledStage>
  );
};

export default CanvasStage;
