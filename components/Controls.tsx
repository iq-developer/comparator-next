import React from 'react';
import type { Line } from '../types';

interface ControlsProps {
  handlePlayAnimation: () => void;
  handleSwitchLines: () => void;
  lines: Line[];
}

const Controls: React.FC<ControlsProps> = ({
  handlePlayAnimation,
  handleSwitchLines,
  lines,
}) => {
  return (
    <div className="flex flex-col items-center justify-center  h-20">
      <button
        onClick={handleSwitchLines}
        className={`w-24 h-10 border-2 border-gray-300 bg-white text-gray-600 hover:bg-sky-200 rounded-md ${
          lines.length === 0 ? '' : ''
        }`}
      >
        {lines.length === 0 ? 'Show lines' : 'Hide lines'}
      </button>

      <button
        onClick={handlePlayAnimation}
        disabled={lines.length === 0}
        className={`w-10 h-10 rounded-full ${
          lines.length === 0 ? 'opacity-0' : 'bg-sky-500 hover:bg-sky-600'
        }`}
      >
        ►
      </button>
    </div>
  );
};

export default Controls;
