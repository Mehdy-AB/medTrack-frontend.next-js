"use client";

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { ServiceHospitalier } from '../models/service.model';

interface FilterServicesProps {
  filters: {
    statut: string;
    chef: string;
    tauxOccupation: string;
  };
  onFilterChange: (filters: {
    statut: string;
    chef: string;
    tauxOccupation: string;
  }) => void;
  services: ServiceHospitalier[];
}

const FilterServices = ({ filters, onFilterChange, services }: FilterServicesProps) => {
  const [showStatutMenu, setShowStatutMenu] = useState(false);
  const [showChefMenu, setShowChefMenu] = useState(false);
  const [showOccupationMenu, setShowOccupationMenu] = useState(false);

  const statuts = ['Tous', 'actif', 'inactif', 'suspendu'];
  const chefOptions = ['Tous', 'avec', 'sans'];
  const occupationOptions = ['Tous', 'sous-utilise', 'optimal', 'surcharge'];

  const handleStatutSelect = (statut: string) => {
    onFilterChange({ ...filters, statut: statut === 'Tous' ? '' : statut });
    setShowStatutMenu(false);
  };

  const handleChefSelect = (chef: string) => {
    onFilterChange({ ...filters, chef: chef === 'Tous' ? '' : chef });
    setShowChefMenu(false);
  };

  const handleOccupationSelect = (occupation: string) => {
    onFilterChange({ ...filters, tauxOccupation: occupation === 'Tous' ? '' : occupation });
    setShowOccupationMenu(false);
  };

  const getStatutLabel = (statut: string) => {
    if (!statut) return 'Statut';
    return statut.charAt(0).toUpperCase() + statut.slice(1);
  };

  const getChefLabel = (chef: string) => {
    switch (chef) {
      case '': return 'Chef de service';
      case 'avec': return 'Avec chef';
      case 'sans': return 'Sans chef';
      default: return 'Chef de service';
    }
  };

  const getOccupationLabel = (occupation: string) => {
    switch (occupation) {
      case '': return 'Taux occupation';
      case 'sous-utilise': return 'Sous-utilisé (<70%)';
      case 'optimal': return 'Optimal (70-90%)';
      case 'surcharge': return 'Surcharge (>90%)';
      default: return 'Taux occupation';
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Filter className="w-5 h-5 text-gray-500" />
      
      {/* Filtre Statut */}
      <div className="relative">
        <button
          onClick={() => setShowStatutMenu(!showStatutMenu)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[120px]"
        >
          {getStatutLabel(filters.statut)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showStatutMenu && (
          <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            {statuts.map((statut) => (
              <button
                key={statut}
                onClick={() => handleStatutSelect(statut)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  filters.statut === (statut === 'Tous' ? '' : statut)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {statut === 'Tous' ? 'Tous les statuts' : statut.charAt(0).toUpperCase() + statut.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtre Chef de service */}
      <div className="relative">
        <button
          onClick={() => setShowChefMenu(!showChefMenu)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
        >
          {getChefLabel(filters.chef)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showChefMenu && (
          <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            {chefOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleChefSelect(option)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  filters.chef === (option === 'Tous' ? '' : option)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option === 'Tous' && 'Tous les services'}
                {option === 'avec' && 'Avec chef de service'}
                {option === 'sans' && 'Sans chef de service'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtre Taux d'occupation */}
      <div className="relative">
        <button
          onClick={() => setShowOccupationMenu(!showOccupationMenu)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[160px]"
        >
          {getOccupationLabel(filters.tauxOccupation)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showOccupationMenu && (
          <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            {occupationOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleOccupationSelect(option)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  filters.tauxOccupation === (option === 'Tous' ? '' : option)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option === 'Tous' && 'Tous les taux'}
                {option === 'sous-utilise' && 'Sous-utilisé (< 70%)'}
                {option === 'optimal' && 'Optimal (70-90%)'}
                {option === 'surcharge' && 'Surcharge (> 90%)'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bouton réinitialiser */}
      {(filters.statut || filters.chef || filters.tauxOccupation) && (
        <button
          onClick={() => onFilterChange({ statut: '', chef: '', tauxOccupation: '' })}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
};

export default FilterServices;