import { useDispatch, useSelector } from 'react-redux';
import { Layer } from 'react-konva';

import { StyledStage } from './styles';
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
