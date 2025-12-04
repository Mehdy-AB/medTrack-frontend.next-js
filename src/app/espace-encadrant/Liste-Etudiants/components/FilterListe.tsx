// Encadrant/PageListe/components/FilterListe.tsx

"use client";

import { useState } from 'react';
import { ChevronDown, Filter as FilterIcon } from 'lucide-react';

interface FilterListeProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  promotion: string;
  specialite: string;
  statut: string;
}

const FilterListe = ({ onFilterChange }: FilterListeProps) => {
  const [filters, setFilters] = useState<FilterState>({
    promotion: '',
    specialite: '',
    statut: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const promotions = ['L3', 'M1', 'M2'];
  const specialites = ['Médecine générale', 'Chirurgie', 'Pédiatrie', 'Neurologie', 'Cardiologie'];
  const statuts = ['En cours', 'Terminé', 'À venir'];

  const handleFilterSelect = (filterType: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };

  const toggleDropdown = (filterType: string) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <FilterIcon className="w-5 h-5 text-gray-500" />
      
      {/* Filtre Promotion */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('promotion')}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          {filters.promotion || 'Promotion'}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {openDropdown === 'promotion' && (
          <div className="absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            <button
              onClick={() => handleFilterSelect('promotion', '')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tous
            </button>
            {promotions.map((promo) => (
              <button
                key={promo}
                onClick={() => handleFilterSelect('promotion', promo)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {promo}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtre Spécialité */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('specialite')}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          {filters.specialite || 'Spécialité'}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {openDropdown === 'specialite' && (
          <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
            <button
              onClick={() => handleFilterSelect('specialite', '')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tous
            </button>
            {specialites.map((spec) => (
              <button
                key={spec}
                onClick={() => handleFilterSelect('specialite', spec)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {spec}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtre Statut de stage */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('statut')}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          {filters.statut || 'Statut de stage'}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {openDropdown === 'statut' && (
          <div className="absolute top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            <button
              onClick={() => handleFilterSelect('statut', '')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tous
            </button>
            {statuts.map((stat) => (
              <button
                key={stat}
                onClick={() => handleFilterSelect('statut', stat)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {stat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterListe;