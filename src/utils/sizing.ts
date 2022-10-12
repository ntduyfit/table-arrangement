import { IRect } from 'konva/lib/types';
import { Box } from 'konva/cmj/shapes/Transformer';
import Konva from 'konva';
import { StageSize } from '../components/canvasStage/constants';

const getCorner = (pivotX: number, pivotY: number, diffX: number, diffY: number, angle: number) => {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);

  /// find angle from pivot to corner
  const newAngle = angle + Math.atan2(diffY, diffX);

  /// get new x and y and round it off to integer
  const x = pivotX + distance * Math.cos(newAngle);
  const y = pivotY + distance * Math.sin(newAngle);

  return { x, y };
};

export const getTotalBox = (boxes: Array<IRect>) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  boxes.forEach((box) => {
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
  });
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

export const getClientRect = (rotatedBox: Box) => {
  const { x, y, width, height } = rotatedBox;
  const rad = rotatedBox.rotation;

  const p1 = getCorner(x, y, 0, 0, rad);
  const p2 = getCorner(x, y, width, 0, rad);
  const p3 = getCorner(x, y, width, height, rad);
  const p4 = getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

export const calculateDrag = (transformNodes: Konva.Node[]) => {
  const transformBox = transformNodes.map((node) => node.getClientRect());
  const box = getTotalBox(transformBox);

  const shape = transformNodes[0];
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
