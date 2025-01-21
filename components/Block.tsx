import React from 'react';
import './Block.css';

interface BlockProps {
  handleRemoveBlock: () => void;
}

const Block: React.FC<BlockProps> = ({ handleRemoveBlock }) => {
  return (
    <button className="w-5 h-5 m-1" onClick={handleRemoveBlock}>
      <div className="cube">
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face left"></div>
        <div className="face right"></div>
        <div className="face front"></div>
        <div className="face back"></div>
      </div>
    </button>
  );
};

export default Block;
