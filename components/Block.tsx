import React from 'react';
import './Block.css';
import { useDrag } from 'react-dnd';

import { ItemTypes } from './ItemTypes';

interface BlockProps {
  handleRemoveBlock: () => void;
  handleAddBlock: () => void;
  finished: boolean;
}

const Block: React.FC<BlockProps> = ({
  handleRemoveBlock,
  handleAddBlock,
  finished,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: 'left-block',
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        handleRemoveBlock();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <button
      ref={drag}
      style={{ opacity }}
      data-testid={`box`}
      className="w-5 h-5 mb-4 block-appearance"
      onClick={handleAddBlock}
      title="Click to add block"
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
