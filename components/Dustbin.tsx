import React from 'react';
import type { FC } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

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
  let backgroundColor = 'bg-gray-800';
  let zIndex = '-z-10';
  if (isActive) {
    backgroundColor = 'bg-green-700';
    zIndex = 'z-10';
  } else if (canDrop) {
    backgroundColor = 'bg-yellow-600';
    zIndex = 'z-10';
  }

  const buttonRef = React.useRef<HTMLDivElement>(null);
  drop(buttonRef);

  return (
    <div
      ref={buttonRef}
      className={`absolute h-full w-full text-white p-4 text-center text-base leading-normal opacity-50 ${backgroundColor} ${zIndex}`}
      data-testid="dustbin"
    >
      {isActive ? 'Release to drop' : 'Drag block here to remove'}
    </div>
  );
};
