import React from 'react';

interface AddBlockPlaceProps {
  handleAddBlock: () => void;
}

const AddBlockPlace: React.FC<AddBlockPlaceProps> = ({ handleAddBlock }) => {
  return (
    <button
      onClick={handleAddBlock}
      className="w-10 h-10 flex justify-center items-center bg-white hover:bg-sky-200 text-gray-600 border-dashed border-gray-300 border-2 text-xl mb-2 ml-2"
      title="Click to add block"
    >
      +
    </button>
  );
};

export default AddBlockPlace;
