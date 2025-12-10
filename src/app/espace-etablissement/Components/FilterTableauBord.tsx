"use client";

import { useState } from 'react';
import { Filter, Download, MessageSquare, RefreshCw, ChevronDown } from 'lucide-react';

interface FilterTableauBordProps {
  onFilterChange: (filters: { statut: string }) => void;
  onExport: () => void;
  onMessageGlobal: () => void;
  onReset: () => void;
}

const FilterTableauBord = ({ onFilterChange, onExport, onMessageGlobal, onReset }: FilterTableauBordProps) => {
  const [filters, setFilters] = useState({ statut: '' });
  const [showStatutMenu, setShowStatutMenu] = useState(false);

  const statuts = ['Tous', 'Optimal', 'Surcharge', 'Sous-utilisé'];

  const handleStatutSelect = (statut: string) => {
    const newFilters = { ...filters, statut: statut === 'Tous' ? '' : statut };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setShowStatutMenu(false);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      {/* Filtres à gauche */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-5 h-5 text-gray-500" />
        
        {/* Filtre Statut */}
        <div className="relative">
          <button
            onClick={() => setShowStatutMenu(!showStatutMenu)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.statut || 'Statut des services'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showStatutMenu && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {statuts.map((statut) => (
                <button
                  key={statut}
                  onClick={() => handleStatutSelect(statut)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {statut}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boutons à droite */}
      <div className="flex gap-3 items-center">
        {/* Bouton Message Global */}
        <button
          onClick={onMessageGlobal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Message Global
        </button>

        {/* Bouton Export */}
        <button
          onClick={onExport}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exporter Rapport
        </button>

        {/* Bouton Réinitialiser */}
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default FilterTableauBord;