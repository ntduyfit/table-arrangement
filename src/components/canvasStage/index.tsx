import { useContext } from 'react';
import { Layer } from 'react-konva';

import { StyledStage } from './styles';
import { StageSize } from './constants';
import RectangleTable from '../rectangleTable';
import TableContext from '../../features/tableArrangement/context';
import { SelectTable } from '../../features/tableArrangement/context/constants';
import { ICircleTable, IRectangleTable } from '../../types/table';
import CircleTable from '../circleTable';

const CanvasStage = () => {
  const { currentStep, history, dispatch } = useContext(TableContext);

  const handleClick = () => {
    dispatch({ type: SelectTable, payload: 0 });
  };

  return (
    <StyledStage width={StageSize.width} height={StageSize.height} onClick={handleClick}>
      <Layer>
        {history[currentStep]?.map((table) => {
          switch (table.type) {
            case 'rectangle':
              return <RectangleTable key={table.id} table={table as IRectangleTable} />;
            case 'circle':
              return <CircleTable key={table.id} table={table as ICircleTable} />;
            default:
              return null;
          }
        })}
      </Layer>
    </StyledStage>
  );
};

export default CanvasStage;
