"use client";

import { useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterButtonProps {
  options: FilterOption[];
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

const FilterButton = ({ options, selectedFilter, onFilterChange }: FilterButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
      >
        Filtré par
      </button>
      
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[160px]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onFilterChange(option.value);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;