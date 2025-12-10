"use client";

import { useState } from 'react';
import { ChevronDown, Filter as FilterIcon, Download, FileText, RefreshCw } from 'lucide-react';

interface FilterRapportsProps {
  onFilterChange: (filters: FilterState) => void;
  onExport: (format: 'pdf' | 'excel') => void;
  onGenerate: () => void;
  onReset: () => void;
}

export interface FilterState {
  typeRapport: string;
  statut: string;
  periode: string;
  stage: string;
}

const FilterRapports = ({ onFilterChange, onExport, onGenerate, onReset }: FilterRapportsProps) => {
  const [filters, setFilters] = useState<FilterState>({
    typeRapport: '',
    statut: '',
    periode: '',
    stage: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const typesRapport = ['Présence', 'Évaluation', 'Attestation', 'Activité'];
  const statuts = ['Complet', 'Incomplet', 'En attente'];
  const periodes = ['< 1 mois', '1-3 mois', '3-6 mois', '> 6 mois'];
  const stages = ['Chirurgie Cardiaque', 'Pédiatrie', 'Cardiologie', 'Urgences', 'Neurochirurgie'];

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
    const resetFilters = { typeRapport: '', statut: '', periode: '', stage: '' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    onReset();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      {/* Filtres à gauche */}
      <div className="flex flex-wrap gap-3 items-center">
        <FilterIcon className="w-5 h-5 text-gray-500" />
        
        {/* Filtre Type de rapport */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('typeRapport')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.typeRapport || 'Type de rapport'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdown === 'typeRapport' && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => handleFilterSelect('typeRapport', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tous
              </button>
              {typesRapport.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterSelect('typeRapport', type)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {type}
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

        {/* Filtre Période */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('periode')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {filters.periode || 'Période'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {openDropdown === 'periode' && (
            <div className="absolute top-full mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => handleFilterSelect('periode', '')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Toutes
              </button>
              {periodes.map((periode) => (
                <button
                  key={periode}
                  onClick={() => handleFilterSelect('periode', periode)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {periode}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boutons à droite */}
      <div className="flex gap-3 items-center">
        {/* Bouton Générer */}
        <button
          onClick={onGenerate}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Générer un rapport
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
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default FilterRapports;