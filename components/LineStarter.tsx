import React, { MouseEvent, TouchEvent } from 'react';
import type { Line } from '../types';

type LineStarterProps = {
  handleMouseDown: (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => void;
  handleMouseUp: (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => void;
  lines: Line[];
  id: string;
  hidden: boolean;
  ref: React.RefObject<HTMLButtonElement>;
};

const LineStarter: React.FC<LineStarterProps> = ({
  handleMouseDown,
  handleMouseUp,
  lines,
  id,
  hidden,
  ref,
}) => {
  const isButtonDisabled = lines.some(
    (line) => line.start.id === id || line.end.id === id
  );

  return (
    <button
      id={id}
      className={`w-10 h-10 bg-white hover:bg-sky-200 border-dashed border-gray-300 border-2 rounded-full -mt-2 ml-2 text-gray-300 text-xl ${
        isButtonDisabled ? 'opacity-0' : ''
      } ${hidden ? 'hidden' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      disabled={isButtonDisabled}
      title="Drag to create a new line"
      ref={ref}
    >
      {id.includes('1') ? '⇢' : '⇠'}
    </button>
  );
};

export default LineStarter;
