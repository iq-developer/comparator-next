import React from 'react';

interface ComparatorSignProps {
  leftStack: number;
  rightStack: number;
}

const ComparatorSign: React.FC<ComparatorSignProps> = ({
  leftStack,
  rightStack,
}) => {
  let result = '';

  if (!leftStack && !rightStack) {
    return;
  }
  if (leftStack === rightStack) {
    result = '=';
  }
  if (leftStack > rightStack) {
    result = '>';
  }
  if (leftStack < rightStack) {
    result = '<';
  }

  return <div className="text-9xl text-gray-400 pb-3">{result}</div>;
};

export default ComparatorSign;
