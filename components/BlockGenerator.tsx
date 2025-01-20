import React from 'react';

type BlockGeneratorProps = {
  stack: number;
  setStack: (stack: number) => void;
};

const BlockGenerator: React.FC<BlockGeneratorProps> = ({ stack, setStack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    if (e.target.value === '') return setStack(0);
    if (Number(e.target.value) > 10) return setStack(10);
    setStack(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-20">
      <input
        type="text"
        value={stack}
        onChange={handleChange}
        className="w-24 h-10 border-2 border-gray-300 rounded-md text-center font-bold text-black"
        max={10}
      />
      <button
        onClick={() => setStack(stack < 10 ? stack + 1 : stack)}
        className="w-10 h-10 bg-white hover:bg-sky-200 border-gray-300 border-2 mt-[-2px] text-xl text-black"
      >
        +
      </button>
    </div>
  );
};

export default BlockGenerator;
