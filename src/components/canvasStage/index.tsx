import { lazy, memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Layer, Stage } from 'react-konva';

import { AppState } from '../../store';
import { StageSize } from './constants';
import RectangleTable from '../rectangleTable';

const CanvasStage = () => {
  const { currentStep, history } = useSelector((state: AppState) => state.tables);

  return (
    <Stage width={StageSize.width} height={StageSize.height} style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
      <Layer>
        {history[currentStep]?.map((table) => (
          <RectangleTable key={table.name} table={table} />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasStage;
