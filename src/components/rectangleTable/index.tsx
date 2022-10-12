import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';

import { ITableProps } from './types';
import useAddTableHistory from '../../features/tableArrangement/hooks/useAddTableHistory';
import { StageSize } from '../canvasStage/constants';
import { getClientRect, getTotalBox } from './utils/sizing';
import TableContext from '../../features/tableArrangement/context';
import { SelectTable } from '../../features/tableArrangement/context/constants';

const RectangleTable = ({ table }: ITableProps): JSX.Element => {
  const { selectedId, dispatch } = useContext(TableContext);
  const tableRef = useRef<Konva.Group>(null);
  const tableSelectionRef = useRef<Konva.Transformer>(null);
  const [isSelected, setIsSelected] = useState(false);
  const { updateTableHistory } = useAddTableHistory();

  useEffect(() => {
    if (isSelected) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    const boxes = tableSelectionRef.current?.nodes().map((node) => node.getClientRect());
    const box = getTotalBox(boxes!);

    const shape = tableSelectionRef.current!.nodes()[0];
    if (shape) {
      const absPos = shape.getAbsolutePosition();
      // where are shapes inside bounding box of all shapes?
      const offsetX = box.x - absPos.x;
      const offsetY = box.y - absPos.y;

      // we total box goes outside of viewport, we need to move absolute position of shape
      const newAbsPos = { ...absPos };
      if (box.x < 0) {
        newAbsPos.x = -offsetX;
      }
      if (box.y < 0) {
        newAbsPos.y = -offsetY;
      }

      if (box.x + box.width > StageSize.width) {
        newAbsPos.x = StageSize.width - box.width - offsetX;
      }
      if (box.y + box.height > StageSize.height) {
        newAbsPos.y = StageSize.height - box.height - offsetY;
      }

      shape.setAbsolutePosition(newAbsPos);
    }
  };

  const handleDragEnd = () => {
    const node = tableRef.current!;
    updateTableHistory({
      ...table,
      pos_x: node.x(),
      pos_y: node.y()
    });

    dispatch({ type: SelectTable, payload: table.id });
  };

  const handleTransformEnd = ({ target }: Konva.KonvaEventObject<Event>) => {
    updateTableHistory({
      ...table,
      pos_x: target.x(),
      pos_y: target.y(),
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY()
    });
    target.scaleX(1);
    target.scaleY(1);
  };

  return (
    <Fragment>
      <Group
        x={table.pos_x}
        y={table.pos_y}
        width={table.width}
        height={table.height}
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
        <Rect
          width={table.width}
          height={table.height}
          stroke='#096BDE'
          cornerRadius={4}
          scaleX={1}
          scaleY={1}
          strokeScaleEnabled={false}
        />
        <Text
          height={table.height}
          verticalAlign='middle'
          text={`${table.name}\nPax: ${table.pax}`}
          width={table.width}
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

export default RectangleTable;
