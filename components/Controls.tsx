import React from 'react';
import type { Line } from '../types';

interface ControlsProps {
  handlePlayAnimation: () => void;
  handleSwitchLines: () => void;
  lines: Line[];
  hidden?: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  handlePlayAnimation,
  handleSwitchLines,
  lines,
  hidden,
}) => {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center h-20 relative ${
          hidden ? 'hidden' : ''
        }`}
      >
        <button
          onClick={handleSwitchLines}
          className={`w-24 h-10 border-2 border-gray-300 bg-white text-gray-600 hover:bg-sky-200 rounded-md`}
        >
          {lines.length === 0 ? 'Show lines' : 'Hide lines'}
        </button>

        <button
          onClick={handlePlayAnimation}
          disabled={lines.length === 0}
          className={`absolute top-20 w-16 h-16 rounded-full text-3xl  ${
            lines.length === 0 ? 'hidden' : 'bg-sky-500 hover:bg-sky-600'
          }`}
        >
          ►
        </button>
      </div>
      <div className={!hidden ? 'hidden' : ''}></div>
    </>
  );
};

export default Controls;
