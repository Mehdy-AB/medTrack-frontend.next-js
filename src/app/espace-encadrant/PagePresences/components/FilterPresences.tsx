// src/app/espace-encadrant/PagePresences/components/FilterPresences.tsx

"use client";

import { useState } from 'react';
import { ChevronDown, Filter as FilterIcon, Download, RefreshCw } from 'lucide-react';

interface FilterPresencesProps {
  onFilterChange: (filters: FilterState) => void;
  onExport: (format: 'pdf' | 'excel') => void;
  onReset: () => void;
}

export interface FilterState {
  stage: string;
  date: string;
  statutPresence: string;
}

const FilterPresences = ({ onFilterChange, onExport, onReset }: FilterPresencesProps) => {
  const [filters, setFilters] = useState<FilterState>({
    stage: '',
    date: '',
    statutPresence: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const stages = ['Chirurgie Cardiaque', 'Pédiatrie', 'Cardiologie', 'Urgences', 'Neurochirurgie', 'Orthopédie'];
  const statutsPresence = ['Non marqué', 'Présent', 'Absent justifié', 'Absent non justifié', 'Retard'];

  const handleFilterSelect = (filterType: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilters = { ...filters, date: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleDropdown = (filterType: string) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleReset = () => {
    const resetFilters = { stage: '', date: '', statutPresence: '' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    onReset();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      {/* Filtres à gauche */}
      <div className="flex flex-wrap gap-3 items-center">
        <FilterIcon className="w-5 h-5 text-gray-500" />
        
        {/* Filtre Stage */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('stage')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.stage || 'Stage'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdown === 'stage' && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
              <button
                onClick={() => handleFilterSelect('stage', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tous
              </button>
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleFilterSelect('stage', stage)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {stage}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtre Date */}
        <input
          type="date"
          value={filters.date}
          onChange={handleDateChange}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        />

        {/* Filtre Statut de présence */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('statutPresence')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.statutPresence || 'Statut de présences'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdown === 'statutPresence' && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => handleFilterSelect('statutPresence', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tous
              </button>
              {statutsPresence.map((statut) => (
                <button
                  key={statut}
                  onClick={() => handleFilterSelect('statutPresence', statut)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {statut}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boutons Export et Reset à droite */}
      <div className="flex gap-3 items-center">
        {/* Bouton Export */}
        <div 
          className="relative"
          onMouseEnter={() => setShowExportMenu(true)}
          onMouseLeave={() => setShowExportMenu(false)}
        >
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exporter (PDF / Excel)
          </button>
          
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => onExport('pdf')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Exporter en PDF
              </button>
              <button
                onClick={() => onExport('excel')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Exporter en Excel
              </button>
            </div>
          )}
        </div>

        {/* Bouton Réinitialiser */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
};

export default FilterPresences;