import React from 'react';
import './Block.css';

interface BlockProps {
  handleRemoveBlock: () => void;
  finished: boolean;
}

const Block: React.FC<BlockProps> = ({ handleRemoveBlock, finished }) => {
  return (
    <button
      className="w-5 h-5 mb-4 block-appearance"
      onClick={handleRemoveBlock}
      title="Click to remove block"
    >
      <div className={`cube ${finished ? 'block-finished' : ''}`}>
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
