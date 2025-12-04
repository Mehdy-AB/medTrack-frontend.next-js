"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  options?: string[];
}

interface FilterProps {
  filters: FilterOption[];
  onFilterChange?: (filterId: string, value: string) => void;
}

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterClick = (filterId: string, value?: string) => {
    if (value) {
      // Si une option est sélectionnée
      setActiveFilters(prev => ({ ...prev, [filterId]: value }));
      if (onFilterChange) {
        onFilterChange(filterId, value);
      }
      setOpenDropdown(null);
    } else {
      // Toggle dropdown
      setOpenDropdown(openDropdown === filterId ? null : filterId);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <div key={filter.id} className="relative">
          {filter.options ? (
            // Dropdown filter
            <>
              <button
                onClick={() => handleFilterClick(filter.id)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                {activeFilters[filter.id] || filter.label}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {openDropdown === filter.id && (
                <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterClick(filter.id, option)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Simple button filter
            <button
              onClick={() => handleFilterClick(filter.id, filter.label)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeFilters[filter.id]
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;