import React, { useState } from "react";

const Dropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full cursor-pointer">
      <div
        className="flex items-center justify-between p-2 border border-gray-300 rounded-lg bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: selectedOption.color }}
            ></span>
            <p>{selectedOption.title}</p>
          </div>
        ) : (
          "Create a Status first"
        )}
        <span className="ml-2">&#9662;</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-32 overflow-auto">
          {options.map((option) => (
            <div
              key={option.$id}
              className="flex items-center p-2 hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: option.color }}
              ></span>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
