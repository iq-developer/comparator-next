import React from 'react';

type BlockGeneratorProps = {
  stack: number;
  setStack: (stack: number) => void;
  isLabelMode: boolean;
};

const BlockGenerator: React.FC<BlockGeneratorProps> = ({
  stack,
  setStack,
  isLabelMode,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    if (e.target.value === '') return setStack(0);
    if (Number(e.target.value) > 10) return setStack(10);
    setStack(Number(e.target.value));
  };

  return (
    <div className="flex items-center justify-center h-20">
      <button
        onClick={() => setStack(stack > 0 ? stack - 1 : stack)}
        className={`w-10 h-10 bg-white text-gray-600 border-gray-300 border-2 ml-[-2px] text-xl  ${
          stack === 0 ? 'opacity-40 bg-gray-300' : ' hover:bg-sky-200'
        }`}
        disabled={stack === 0}
        title="Minus one block"
        hidden={isLabelMode}
      >
        -
      </button>
      <input
        type="text"
        value={stack}
        onChange={handleChange}
        className={`w-16 h-10  border-gray-300 text-center font-bold text-gray-600 ${
          isLabelMode ? 'text-2xl' : 'border-2 '
        }`}
        max={10}
        disabled={isLabelMode}
        title={
          isLabelMode
            ? 'Label mode - number of blocks'
            : 'Input mode - numbers 1-10'
        }
      />

      <button
        onClick={() => setStack(stack < 10 ? stack + 1 : stack)}
        className={`w-10 h-10 bg-white text-gray-600 border-gray-300 border-2 ml-[-2px] text-xl  ${
          stack === 10 ? 'opacity-40 bg-gray-300' : ' hover:bg-sky-200'
        }`}
        disabled={stack === 10}
        title="Plus one block"
        hidden={isLabelMode}
      >
        +
      </button>
    </div>
  );
};

export default BlockGenerator;
