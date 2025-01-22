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
        className={`flex  items-center justify-center h-20 ${
          hidden ? 'hidden' : ''
        }`}
      >
        <button
          onClick={handleSwitchLines}
          className={`w-10 h-10 border-2 border-gray-300 bg-white text-gray-600 hover:bg-sky-200 m-1`}
        >
          {lines?.length === 0 ? ')' : '(o)'}
        </button>

        <button
          onClick={handlePlayAnimation}
          disabled={lines?.length < 2}
          className={`w-10 h-10 text-2xl text-white m-1  ${
            lines?.length < 2
              ? 'opacity-50 bg-gray-200 border-gray-300 border-2'
              : 'bg-sky-500 hover:bg-sky-600'
          }`}
        >
          ►
        </button>

        <button
          onClick={handleSwitchLines}
          className={`w-10 h-10 border-2 border-gray-300 bg-white text-gray-600 hover:bg-sky-200  m-1`}
        >
          {lines?.length === 0 ? 'Y' : 'N'}
        </button>
      </div>
      <div className={!hidden ? 'hidden' : ''}></div>
    </>
  );
};

export default Controls;
