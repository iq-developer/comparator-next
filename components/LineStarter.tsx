import React, { MouseEvent } from 'react';
import type { Line } from '../types';

type ControlsProps = {
  handleMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  lines: Line[];
  id: string;
  hidden?: boolean;
};

const LineStarter: React.FC<ControlsProps> = ({
  handleMouseDown,
  lines,
  id,
  hidden,
}) => {
  const isButtonDisabled = (id: string) => {
    return lines.some((line) => line.start.id === id || line.end.id === id);
  };

  return (
    <button
      id={id}
      className={`w-10 h-10 bg-white hover:bg-sky-200 border-dashed border-gray-300 border-2 rounded-full -mt-2 ml-2 text-gray-300 text-xl ${
        isButtonDisabled(id) ? 'opacity-0' : ''
      } ${hidden ? 'hidden' : ''}`}
      onMouseDown={handleMouseDown}
      disabled={isButtonDisabled(id)}
      title="Drag to create a new line"
    >
      {id.includes('1') ? '⇢' : '⇠'}
    </button>
  );
};

export default LineStarter;
