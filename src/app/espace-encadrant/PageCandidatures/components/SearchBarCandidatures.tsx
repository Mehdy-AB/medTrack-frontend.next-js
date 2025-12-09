"use client";

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarCandidaturesProps {
  onSearch: (value: string) => void;
}

const SearchBarCandidatures = ({ onSearch }: SearchBarCandidaturesProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Rechercher par nom, matricule, spécialité ou université..."
        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};

export default SearchBarCandidatures;