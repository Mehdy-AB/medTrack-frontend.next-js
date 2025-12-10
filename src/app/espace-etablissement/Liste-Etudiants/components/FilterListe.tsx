"use client";

import { useState } from 'react';
import { ChevronDown, Filter as FilterIcon, Download, RefreshCw } from 'lucide-react';

interface FilterListeProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  onExport: (format: 'pdf' | 'excel') => void;
}

export interface FilterState {
  promotion: string;
  specialite: string;
  statut: string;
}

const FilterListe = ({ onFilterChange, onReset, onExport }: FilterListeProps) => {
  const [filters, setFilters] = useState<FilterState>({
    promotion: '',
    specialite: '',
    statut: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const promotions = ['2023-2024', '2024-2025', '2025-2026', '2026-2027'];
  const specialites = ['Chirurgie', 'Médecine Générale', 'Pédiatrie', 'Cardiologie', 'Urgences', 'Neurochirurgie', 'Orthopédie'];
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

  const handleResetFilters = () => {
    const resetFilters = { promotion: '', specialite: '', statut: '' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    onReset();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      {/* Filtres à gauche */}
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
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
              <button
                onClick={() => handleFilterSelect('promotion', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Toutes
              </button>
              {promotions.map((promotion) => (
                <button
                  key={promotion}
                  onClick={() => handleFilterSelect('promotion', promotion)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {promotion}
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
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-60 overflow-y-auto">
              <button
                onClick={() => handleFilterSelect('specialite', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Toutes
              </button>
              {specialites.map((specialite) => (
                <button
                  key={specialite}
                  onClick={() => handleFilterSelect('specialite', specialite)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {specialite}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtre Statut */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('statut')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.statut || 'Statut'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdown === 'statut' && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => handleFilterSelect('statut', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tous
              </button>
              {statuts.map((statut) => (
                <button
                  key={statut}
                  onClick={() => handleFilterSelect('statut', statut)}
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
        {/* Bouton Export - Menu au survol */}
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
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exporter en PDF
              </button>
              <button
                onClick={() => onExport('excel')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exporter en Excel
              </button>
            </div>
          )}
        </div>

        {/* Bouton Réinitialiser */}
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
};

export default FilterListe;