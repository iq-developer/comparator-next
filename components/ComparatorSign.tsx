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
  let title = '';

  if (!leftStack && !rightStack) {
    return;
  }
  if (leftStack === rightStack) {
    result = '=';
    title = 'Both stacks are equal';
  }
  if (leftStack > rightStack) {
    result = '>';
    title = 'Left stack is greater';
  }
  if (leftStack < rightStack) {
    result = '<';
    title = 'Right stack is greater';
  }

  return (
    <div
      className={`text-9xl pb-3 ${finished ? 'text-sky-500' : 'text-gray-400'}`}
      title={title}
    >
      {result}
    </div>
  );
};

export default ComparatorSign;
