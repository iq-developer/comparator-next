import React from 'react';
import type { Line } from '../types';
import { FaPlay } from 'react-icons/fa6';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { MdInput } from 'react-icons/md';
import { TbNumber123 } from 'react-icons/tb';

interface ControlsProps {
  handlePlayAnimation: () => void;
  handleSwitchLines: () => void;
  lines: Line[];
  hidden: boolean;
  isLabelMode: boolean;
  setIsLabelMode: (isLabelMode: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({
  handlePlayAnimation,
  handleSwitchLines,
  isLabelMode,
  setIsLabelMode,
  lines,
  hidden,
}) => {
  return (
    <div className={`flex  items-center justify-center h-20 `}>
      <button
        onClick={handleSwitchLines}
        className={`w-10 h-10 border-2 border-gray-300 bg-white text-gray-500 hover:bg-sky-200 m-1 text-2xl flex justify-center items-center ${
          hidden ? 'hidden' : ''
        }`}
        title="Show/hide lines"
      >
        {lines?.length === 0 ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>

      <button
        onClick={handlePlayAnimation}
        disabled={lines?.length < 2}
        className={`w-10 h-10 text-xl text-white m-1 flex justify-center items-center  ${
          lines?.length < 2
            ? 'opacity-40 bg-gray-300 border-gray-300 border-2'
            : 'bg-sky-500 hover:bg-sky-600'
        } ${hidden ? 'hidden' : ''}`}
        title="Play final animation"
      >
        <FaPlay />
      </button>

      <button
        onClick={() => setIsLabelMode(!isLabelMode)}
        className={`w-10 h-10 border-2 border-gray-300 bg-white text-gray-500 hover:bg-sky-200 m-1 text-2xl flex justify-center items-center `}
        title="Switch input/label mode"
      >
        {isLabelMode ? <TbNumber123 /> : <MdInput />}
      </button>
    </div>
  );
};

export default Controls;
