import React from 'react';

interface ComparatorSignProps {
  leftStack: number;
  rightStack: number;
  finished: boolean;
}

const ComparatorSign: React.FC<ComparatorSignProps> = ({
  leftStack,
  rightStack,
  finished,
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

  return (
    <div
      className={`text-9xl pb-3 ${finished ? 'text-sky-500' : 'text-gray-400'}`}
    >
      {result}
    </div>
  );
};

export default ComparatorSign;
