"use client";

import { useState } from 'react';
import { Filter, ChevronDown, Search, Calendar, Users, Building } from 'lucide-react';
import { FiltresCandidatures, Service } from '../models/candidature.model';

interface FilterCandidaturesProps {
  filters: FiltresCandidatures;
  onFilterChange: (filters: FiltresCandidatures) => void;
  services: Service[];
  onSearch: (term: string) => void;
}

const FilterCandidatures = ({ filters, onFilterChange, services, onSearch }: FilterCandidaturesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showStatutMenu, setShowStatutMenu] = useState(false);
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [showHopitalMenu, setShowHopitalMenu] = useState(false);
  const [showNiveauMenu, setShowNiveauMenu] = useState(false);

  const statuts = [
    { value: '', label: 'Tous les statuts' },
    { value: 'en_attente', label: 'En attente' },
    { value: 'pre_validee', label: 'Pré-validée' },
    { value: 'transmise_service', label: 'Transmise' },
    { value: 'acceptee_chef', label: 'Acceptée' },
    { value: 'refusee_chef', label: 'Refusée' }
  ];

  const niveauxEtude = [
    { value: '', label: 'Tous niveaux' },
    { value: 'L2', label: 'L2' },
    { value: 'L3', label: 'L3' },
    { value: 'M1', label: 'M1' },
    { value: 'M2', label: 'M2' },
    { value: 'D1', label: 'D1' },
    { value: 'D2', label: 'D2' }
  ];

  const hopitaux = Array.from(new Set(services.map(s => s.hopitalNom)));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleStatutSelect = (statut: string) => {
    onFilterChange({ ...filters, statut });
    setShowStatutMenu(false);
  };

  const handleServiceSelect = (service: string) => {
    onFilterChange({ ...filters, service });
    setShowServiceMenu(false);
  };

  const handleHopitalSelect = (hopital: string) => {
    onFilterChange({ ...filters, hopital });
    setShowHopitalMenu(false);
  };

  const handleNiveauSelect = (niveau: string) => {
    onFilterChange({ ...filters, niveauEtude: niveau });
    setShowNiveauMenu(false);
  };

  const handleDateChange = (field: 'dateDebut' | 'dateFin', value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const resetFilters = () => {
    onFilterChange({
      statut: '',
      service: '',
      hopital: '',
      niveauEtude: '',
      dateDebut: '',
      dateFin: ''
    });
    setSearchTerm('');
    onSearch('');
  };

  const getSelectedServiceLabel = () => {
    if (!filters.service) return 'Service';
    const service = services.find(s => s.id === filters.service);
    return service?.nom || 'Service';
  };

  const getSelectedHopitalLabel = () => {
    if (!filters.hopital) return 'Hôpital';
    return filters.hopital;
  };

  const getSelectedStatutLabel = () => {
    if (!filters.statut) return 'Statut';
    const statut = statuts.find(s => s.value === filters.statut);
    return statut?.label || 'Statut';
  };

  const getSelectedNiveauLabel = () => {
    if (!filters.niveauEtude) return 'Niveau';
    const niveau = niveauxEtude.find(n => n.value === filters.niveauEtude);
    return niveau?.label || 'Niveau';
  };

  return (
    <div className="space-y-4">
      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Rechercher étudiant, stage, service..."
        />
      </form>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-5 h-5 text-gray-500" />
        
        {/* Filtre Statut */}
        <div className="relative">
          <button
            onClick={() => setShowStatutMenu(!showStatutMenu)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
          >
            {getSelectedStatutLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showStatutMenu && (
            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {statuts.map((statut) => (
                <button
                  key={statut.value}
                  onClick={() => handleStatutSelect(statut.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    filters.statut === statut.value
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {statut.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtre Service */}
        <div className="relative">
          <button
            onClick={() => setShowServiceMenu(!showServiceMenu)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
          >
            {getSelectedServiceLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showServiceMenu && (
            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-64 overflow-y-auto">
              <button
                onClick={() => handleServiceSelect('')}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  !filters.service ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tous les services
              </button>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    filters.service === service.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {service.nom}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtre Hôpital */}
        <div className="relative">
          <button
            onClick={() => setShowHopitalMenu(!showHopitalMenu)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
          >
            {getSelectedHopitalLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showHopitalMenu && (
            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 max-h-64 overflow-y-auto">
              <button
                onClick={() => handleHopitalSelect('')}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  !filters.hopital ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tous les hôpitaux
              </button>
              {hopitaux.map((hopital) => (
                <button
                  key={hopital}
                  onClick={() => handleHopitalSelect(hopital)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    filters.hopital === hopital
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {hopital}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtre Niveau d'étude */}
        <div className="relative">
          <button
            onClick={() => setShowNiveauMenu(!showNiveauMenu)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
          >
            {getSelectedNiveauLabel()}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showNiveauMenu && (
            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {niveauxEtude.map((niveau) => (
                <button
                  key={niveau.value}
                  onClick={() => handleNiveauSelect(niveau.value)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    filters.niveauEtude === niveau.value
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {niveau.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="date"
              value={filters.dateDebut}
              onChange={(e) => handleDateChange('dateDebut', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm min-w-[140px] focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Date début"
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <input
              type="date"
              value={filters.dateFin}
              onChange={(e) => handleDateChange('dateFin', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm min-w-[140px] focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Date fin"
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Bouton réinitialiser */}
        {(filters.statut || filters.service || filters.hopital || filters.niveauEtude || filters.dateDebut || filters.dateFin || searchTerm) && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterCandidatures;