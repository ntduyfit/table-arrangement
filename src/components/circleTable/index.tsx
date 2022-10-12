import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Circle, Group, Text, Transformer } from 'react-konva';
import Konva from 'konva';

import { ICircleTableProps } from './types';
import useAddTableHistory from '../../features/tableArrangement/hooks/useAddTableHistory';
import { StageSize } from '../canvasStage/constants';
import { calculateDrag, getClientRect } from '../../utils/sizing';
import TableContext from '../../features/tableArrangement/context';
import { SelectTable } from '../../features/tableArrangement/context/constants';

const CircleTable = ({ table }: ICircleTableProps): JSX.Element => {
  const { selectedId, dispatch } = useContext(TableContext);
  const tableRef = useRef<Konva.Group>(null);
  const tableSelectionRef = useRef<Konva.Transformer>(null);
  const [isSelected, setIsSelected] = useState(false);
  const { updateTableHistory } = useAddTableHistory();

  useEffect(() => {
    if (isSelected) {
      tableSelectionRef.current?.nodes([tableRef.current!]);
      tableSelectionRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected, table]);

  useEffect(() => {
    if (selectedId === table.id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedId]);

  const handleSelect = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // prevent click event bubble up to Stage
    event.cancelBubble = true;

    dispatch({ type: SelectTable, payload: table.id });
  };

  // Ensure table is always limited on stage
  const handleDragMove = () => {
    const transformNodes = tableSelectionRef.current?.nodes();
    calculateDrag(transformNodes!);
  };

  const handleDragEnd = () => {
    const node = tableRef.current!;
    updateTableHistory({
      ...table,
      shape: {
        ...table.shape,
        pos_x: node.x(),
        pos_y: node.y()
      }
    });

    dispatch({ type: SelectTable, payload: table.id });
  };

  const handleTransformEnd = ({ target }: Konva.KonvaEventObject<Event>) => {
    updateTableHistory({
      ...table,
      shape: {
        ...table.shape,
        pos_x: target.x(),
        pos_y: target.y(),
        radius: target.width() * target.scaleX()
      }
    });
    target.scaleX(1);
    target.scaleY(1);
  };

  return (
    <Fragment>
      <Group
        x={table.shape.pos_x}
        y={table.shape.pos_y}
        width={table.shape.radius}
        height={table.shape.radius}
        ref={tableRef}
        onClick={handleSelect}
        draggable
        onDragStart={() => setIsSelected(true)}
        onDragEnd={handleDragEnd}
        scaleX={1}
        scaleY={1}
        onDragMove={handleDragMove}
        onTransformEnd={handleTransformEnd}
      >
        <Circle radius={table.shape.radius} stroke='#096BDE' cornerRadius={4} scaleX={1} scaleY={1} strokeScaleEnabled={false} />
        <Text
          height={table.shape.radius * 2}
          verticalAlign='middle'
          x={-table.shape.radius}
          y={-table.shape.radius}
          text={`${table.name}\nPax: ${table.number_of_pax}`}
          width={table.shape.radius * 2}
          lineHeight={1.5}
          wrap='\n'
          align='center'
          fontSize={20}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={tableSelectionRef}
          rotateEnabled={false}
          flipEnabled={false}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          boundBoxFunc={(oldBox, newBox) => {
            const box = getClientRect(newBox);
            const isOut = box.x < 0 || box.y < 0 || box.x + box.width > StageSize.width || box.y + box.height > StageSize.height;

            if (isOut) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

export default CircleTable;
