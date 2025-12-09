"use client";

import { useState } from 'react';
import { ChevronDown, Filter as FilterIcon, Download, Check, X, Printer } from 'lucide-react';

interface FilterCandidaturesProps {
  onFilterChange: (filters: FilterState) => void;
  onExport: (format: 'excel' | 'print') => void;
  onMassAction: (action: 'accept' | 'reject') => void;
  onShowHistory: () => void;
}

export interface FilterState {
  statut: string;
  specialite: string;
  anciennete: string;
  universite: string;
}

const FilterCandidatures = ({ onFilterChange, onExport, onMassAction, onShowHistory }: FilterCandidaturesProps) => {
  const [filters, setFilters] = useState<FilterState>({
    statut: '',
    specialite: '',
    anciennete: '',
    universite: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMassMenu, setShowMassMenu] = useState(false);

  const statuts = ['En attente', 'Acceptées', 'Refusées'];
  const specialites = ['Médecine Générale', 'Chirurgie', 'Cardiologie', 'Pédiatrie', 'Neurochirurgie'];
  const anciennetes = ['< 3 jours', '3-7 jours', '> 7 jours', 'Prioritaires'];
  const universites = ['Université d\'Alger', 'Université de Blida', 'Université d\'Oran', 'Université de Constantine'];

  const handleFilterSelect = (filterType: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };

  const toggleDropdown = (filterType: string) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleReset = () => {
    const resetFilters = { statut: '', specialite: '', anciennete: '', universite: '' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      {/* Filtres à gauche */}
      <div className="flex flex-wrap gap-3 items-center">
        <FilterIcon className="w-5 h-5 text-gray-500" />
        
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

        {/* Filtre Ancienneté */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('anciennete')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.anciennete || 'Ancienneté'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdown === 'anciennete' && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => handleFilterSelect('anciennete', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Toutes
              </button>
              {anciennetes.map((ancien) => (
                <button
                  key={ancien}
                  onClick={() => handleFilterSelect('anciennete', ancien)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {ancien}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boutons Action de masse, Export et Historique à droite */}
      <div className="flex gap-3 items-center">
        {/* Bouton Action de masse - Menu au survol */}
        <div 
          className="relative"
          onMouseEnter={() => setShowMassMenu(true)}
          onMouseLeave={() => setShowMassMenu(false)}
        >
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Traiter en masse
          </button>
          
          {showMassMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => onMassAction('accept')}
                className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Accepter sélection
              </button>
              <button
                onClick={() => onMassAction('reject')}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Refuser sélection
              </button>
            </div>
          )}
        </div>

        {/* Bouton Historique */}
        <button
          onClick={onShowHistory}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Voir l'historique
        </button>

        {/* Bouton Export - Menu au survol */}
        <div 
          className="relative"
          onMouseEnter={() => setShowExportMenu(true)}
          onMouseLeave={() => setShowExportMenu(false)}
        >
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exporter
          </button>
          
          {showExportMenu && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => onExport('excel')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Excel
              </button>
              <button
                onClick={() => onExport('print')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterCandidatures;