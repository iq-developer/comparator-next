import React from 'react';
import './Block.css';

const Block = () => {
  return (
    <div className="w-5 h-5 m-1">
      <div className="cube">
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face left"></div>
        <div className="face right"></div>
        <div className="face front"></div>
        <div className="face back"></div>
      </div>
    </div>
  );
};

export default Block;
