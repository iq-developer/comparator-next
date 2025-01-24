import React from 'react';

interface AddBlockPlaceProps {
  handleAddBlock: () => void;
  position: 'left' | 'right';
}

const AddBlockPlace: React.FC<AddBlockPlaceProps> = ({
  handleAddBlock,
  position,
}) => {
  return (
    <button
      onClick={handleAddBlock}
      className={`w-10 h-10  -mt-5 -mb-3 flex justify-center items-center bg-white hover:bg-sky-200 text-gray-600 border-dashed border-gray-300 border-2 text-xl mb-1 ml-2 ${
        position === 'left' ? 'mr-20' : 'ml-20'
      }`}
      title="Click to add block"
    >
      +
    </button>
  );
};

export default AddBlockPlace;
