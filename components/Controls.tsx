import React from 'react';
import type { Line } from '../types';
import { FaPlay } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';

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
          className={`w-10 h-10 border-2 border-gray-300 bg-white text-gray-500 hover:bg-sky-200 m-1 text-2xl flex justify-center items-center`}
        >
          {lines?.length === 0 ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>

        <button
          onClick={handlePlayAnimation}
          disabled={lines?.length < 2}
          className={`w-10 h-10 text-xl text-white m-1 flex justify-center items-center  ${
            lines?.length < 2
              ? 'opacity-50 bg-gray-200 border-gray-300 border-2'
              : 'bg-sky-500 hover:bg-sky-600'
          }`}
        >
          <FaPlay />
        </button>
      </div>
      <div className={!hidden ? 'hidden' : ''}></div>
    </>
  );
};

export default Controls;
