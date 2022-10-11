import { useDispatch, useSelector } from 'react-redux';
import { Layer, Stage } from 'react-konva';

import { AppState } from '../../store';
import { StageSize } from './constants';
import RectangleTable from '../rectangleTable';
import { selectTable } from '../../features/tableArrangement/reducer';

const CanvasStage = () => {
  const { currentStep, history } = useSelector((state: AppState) => state.tables);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectTable(0));
  };

  return (
    <Stage width={StageSize.width} height={StageSize.height} style={{ backgroundColor: 'rgb(250, 250, 250)' }} onClick={handleClick}>
      <Layer>
        {history[currentStep]?.map((table) => (
          <RectangleTable key={table.name} table={table} />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasStage;
