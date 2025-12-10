"use client";

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { AnnonceStage, Hopital } from '../models/annonce.model';

interface FilterAnnoncesProps {
  filters: {
    statut: string;
    service: string;
    hopital: string;
    periode: string;
    statutStage: string;
  };
  onFilterChange: (filters: {
    statut: string;
    service: string;
    hopital: string;
    periode: string;
    statutStage: string;
  }) => void;
  annonces: AnnonceStage[];
  services: Array<{ id: string; nom: string }>;
  hopitaux: Hopital[];
}

const FilterAnnonces = ({ filters, onFilterChange, annonces, services, hopitaux }: FilterAnnoncesProps) => {
  const [showStatutMenu, setShowStatutMenu] = useState(false);
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [showHopitalMenu, setShowHopitalMenu] = useState(false);
  const [showPeriodeMenu, setShowPeriodeMenu] = useState(false);
  const [showStatutStageMenu, setShowStatutStageMenu] = useState(false);

  const statuts = ['Tous', 'active', 'publiée', 'brouillon', 'clôturée', 'archivée'];
  const periodes = ['Tous', 'urgent', 'prochain', 'futur'];
  const statutsStage = ['Tous', 'non_debute', 'en_cours', 'termine'];

  const handleStatutSelect = (statut: string) => {
    onFilterChange({ ...filters, statut: statut === 'Tous' ? '' : statut });
    setShowStatutMenu(false);
  };

  const handleServiceSelect = (service: string) => {
    onFilterChange({ ...filters, service: service === 'Tous' ? '' : service });
    setShowServiceMenu(false);
  };

  const handleHopitalSelect = (hopital: string) => {
    onFilterChange({ ...filters, hopital: hopital === 'Tous' ? '' : hopital });
    setShowHopitalMenu(false);
  };

  const handlePeriodeSelect = (periode: string) => {
    onFilterChange({ ...filters, periode: periode === 'Tous' ? '' : periode });
    setShowPeriodeMenu(false);
  };

  const handleStatutStageSelect = (statutStage: string) => {
    onFilterChange({ ...filters, statutStage: statutStage === 'Tous' ? '' : statutStage });
    setShowStatutStageMenu(false);
  };

  const getStatutLabel = (statut: string) => {
    if (!statut) return 'Statut';
    return statut.charAt(0).toUpperCase() + statut.slice(1);
  };

  const getServiceLabel = (serviceId: string) => {
    if (!serviceId) return 'Service';
    const service = services.find(s => s.id === serviceId);
    return service?.nom || 'Service';
  };

  const getHopitalLabel = (hopitalId: string) => {
    if (!hopitalId) return 'Hôpital';
    const hopital = hopitaux.find(h => h.id === hopitalId);
    return hopital?.nom || 'Hôpital';
  };

  const getPeriodeLabel = (periode: string) => {
    switch (periode) {
      case '': return 'Période';
      case 'urgent': return 'Urgent (7j)';
      case 'prochain': return 'Prochain (30j)';
      case 'futur': return 'Futur (>30j)';
      default: return 'Période';
    }
  };

  const getStatutStageLabel = (statutStage: string) => {
    switch (statutStage) {
      case '': return 'Statut Stage';
      case 'non_debute': return 'Non débuté';
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      default: return 'Statut Stage';
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

      {/* Filtre Service */}
      <div className="relative">
        <button
          onClick={() => setShowServiceMenu(!showServiceMenu)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
        >
          {getServiceLabel(filters.service)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showServiceMenu && (
          <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            <button
              onClick={() => handleServiceSelect('Tous')}
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
          {getHopitalLabel(filters.hopital)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showHopitalMenu && (
          <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            <button
              onClick={() => handleHopitalSelect('Tous')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                !filters.hopital ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tous les hôpitaux
            </button>
            {hopitaux.map((hopital) => (
              <button
                key={hopital.id}
                onClick={() => handleHopitalSelect(hopital.id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  filters.hopital === hopital.id
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {hopital.nom} - {hopital.ville}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtre Période */}
      <div className="relative">
        <button
          onClick={() => setShowPeriodeMenu(!showPeriodeMenu)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
        >
          {getPeriodeLabel(filters.periode)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showPeriodeMenu && (
          <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            {periodes.map((periode) => (
              <button
                key={periode}
                onClick={() => handlePeriodeSelect(periode)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  filters.periode === (periode === 'Tous' ? '' : periode)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {periode === 'Tous' && 'Toutes périodes'}
                {periode === 'urgent' && 'Urgent (date limite < 7 jours)'}
                {periode === 'prochain' && 'Prochain (date limite < 30 jours)'}
                {periode === 'futur' && 'Futur (date limite > 30 jours)'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtre Statut Stage */}
      <div className="relative">
        <button
          onClick={() => setShowStatutStageMenu(!showStatutStageMenu)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-[140px]"
        >
          {getStatutStageLabel(filters.statutStage)}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showStatutStageMenu && (
          <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            {statutsStage.map((statutStage) => (
              <button
                key={statutStage}
                onClick={() => handleStatutStageSelect(statutStage)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  filters.statutStage === (statutStage === 'Tous' ? '' : statutStage)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {statutStage === 'Tous' && 'Tous les statuts'}
                {statutStage === 'non_debute' && 'Non débutés'}
                {statutStage === 'en_cours' && 'En cours'}
                {statutStage === 'termine' && 'Terminés'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bouton réinitialiser */}
      {(filters.statut || filters.service || filters.hopital || filters.periode || filters.statutStage) && (
        <button
          onClick={() => onFilterChange({ statut: '', service: '', hopital: '', periode: '', statutStage: '' })}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
};

export default FilterAnnonces;