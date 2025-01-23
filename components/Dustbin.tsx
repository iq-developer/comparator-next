import type { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './ItemTypes';

const style: CSSProperties = {
  position: 'absolute',
  top: 0,
  zIndex: -1,
  height: '140px',
  width: '100vw',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  opacity: 0.5,
};

export const Dustbin: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
    style.zIndex = 1;
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
    style.zIndex = 1;
  } else {
    style.zIndex = -1;
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag block here to remove'}
    </div>
  );
};
