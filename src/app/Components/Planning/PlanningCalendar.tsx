"use client";

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, X } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Stage {
  id: string;
  titre: string;
  service: string;
  hopital: string;
  dateDebut: string; // Format: "YYYY-MM-DD"
  dateFin: string;   // Format: "YYYY-MM-DD"
  encadrant?: string;
  color?: string; // Couleur pour différencier les stages
}

interface PlanningCalendarProps {
  year?: number;
  stages?: Stage[];
  onStageClick?: (stage: Stage) => void;
}

const PlanningCalendar = ({ 
  year = 2025, 
  stages = [],
  onStageClick 
}: PlanningCalendarProps) => {
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  
  // États pour les filtres
  const [filterHopital, setFilterHopital] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterWeek, setFilterWeek] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Extraire les valeurs uniques pour les filtres
  const hopitaux = useMemo(() => {
    return ['all', ...Array.from(new Set(stages.map(s => s.hopital)))];
  }, [stages]);

  const services = useMemo(() => {
    return ['all', ...Array.from(new Set(stages.map(s => s.service)))];
  }, [stages]);

  // Fonction pour obtenir le numéro de semaine
  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  // Filtrer les stages selon les critères sélectionnés
  const stagesFiltres = useMemo(() => {
    return stages.filter(stage => {
      // Filtre par hôpital
      if (filterHopital !== 'all' && stage.hopital !== filterHopital) return false;
      
      // Filtre par service
      if (filterService !== 'all' && stage.service !== filterService) return false;
      
      // Filtre par mois
      if (filterMonth !== 'all') {
        const monthIndex = parseInt(filterMonth);
        const stageStart = new Date(stage.dateDebut);
        const stageEnd = new Date(stage.dateFin);
        const hasMonthOverlap = 
          (stageStart.getMonth() === monthIndex && stageStart.getFullYear() === currentYear) ||
          (stageEnd.getMonth() === monthIndex && stageEnd.getFullYear() === currentYear) ||
          (stageStart <= new Date(currentYear, monthIndex, 1) && 
           stageEnd >= new Date(currentYear, monthIndex + 1, 0));
        if (!hasMonthOverlap) return false;
      }
      
      // Filtre par semaine
      if (filterWeek !== 'all') {
        const weekNum = parseInt(filterWeek);
        const stageStart = new Date(stage.dateDebut);
        const stageEnd = new Date(stage.dateFin);
        
        // Vérifier si le stage chevauche cette semaine
        let hasWeekOverlap = false;
        let currentDate = new Date(stageStart);
        while (currentDate <= stageEnd) {
          if (getWeekNumber(currentDate) === weekNum && currentDate.getFullYear() === currentYear) {
            hasWeekOverlap = true;
            break;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        if (!hasWeekOverlap) return false;
      }
      
      return true;
    });
  }, [stages, filterHopital, filterService, filterMonth, filterWeek, currentYear]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilterHopital('all');
    setFilterService('all');
    setFilterMonth('all');
    setFilterWeek('all');
  };

  // Compter les filtres actifs
  const activeFiltersCount = [filterHopital, filterService, filterMonth, filterWeek].filter(f => f !== 'all').length;

  // Fonction pour obtenir le nombre de jours dans un mois
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Fonction pour obtenir le premier jour du mois
  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  // Trouver le stage pour une date donnée (parmi les stages filtrés)
  const getStageForDate = (day: number, month: number): Stage | null => {
    const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return stagesFiltres.find(stage => {
      return dateStr >= stage.dateDebut && dateStr <= stage.dateFin;
    }) || null;
  };

  // Gérer le clic sur une date avec stage
  const handleDateClick = (stage: Stage | null) => {
    if (stage) {
      setSelectedStage(stage);
      onStageClick?.(stage);
    }
  };

  // Générer les jours d'un mois
  const renderMonth = (monthIndex: number) => {
    const daysInMonth = getDaysInMonth(monthIndex, currentYear);
    const firstDay = getFirstDayOfMonth(monthIndex, currentYear);
    const days = [];

    // Ajouter les espaces vides avant le premier jour
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const stage = getStageForDate(day, monthIndex);
      const hasStage = stage !== null;
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(stage)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all ${
            hasStage
              ? `${stage.color || 'bg-teal-500'} text-white font-semibold hover:opacity-80 shadow-sm`
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title={hasStage ? `${stage.titre} - ${stage.hopital}` : ''}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Filtrer les stages à venir
  const stagesAvenir = stagesFiltres.filter(stage => {
    const today = new Date().toISOString().split('T')[0];
    return stage.dateDebut >= today;
  }).sort((a, b) => a.dateDebut.localeCompare(b.dateDebut));

  return (
    <div className="space-y-6">
      {/* Barre de filtres */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Filter className="w-6 h-6 text-teal-600" />
            Filtres
            {activeFiltersCount > 0 && (
              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </h2>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              {showFilters ? 'Masquer' : 'Afficher'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtre Hôpital */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hôpital
              </label>
              <select
                value={filterHopital}
                onChange={(e) => setFilterHopital(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">Tous les hôpitaux</option>
                {hopitaux.filter(h => h !== 'all').map((hopital) => (
                  <option key={hopital} value={hopital}>
                    {hopital}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">Tous les services</option>
                {services.filter(s => s !== 'all').map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre Mois */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mois
              </label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">Tous les mois</option>
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre Semaine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semaine
              </label>
              <select
                value={filterWeek}
                onChange={(e) => setFilterWeek(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">Toutes les semaines</option>
                {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => (
                  <option key={week} value={week}>
                    Semaine {week}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Indicateur de résultats */}
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">{stagesFiltres.length}</span> stage(s) trouvé(s)
          {activeFiltersCount > 0 && ' avec les filtres appliqués'}
        </div>
      </div>

      {/* Liste des stages à venir */}
      {stagesAvenir.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-teal-600" />
            Stages à venir ({stagesAvenir.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stagesAvenir.map((stage) => (
              <div
                key={stage.id}
                onClick={() => handleDateClick(stage)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedStage?.id === stage.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${stage.color || 'bg-teal-500'} mb-2`}></div>
                <h3 className="font-semibold text-gray-800 mb-1">{stage.titre}</h3>
                <p className="text-sm text-gray-600 mb-1">{stage.service}</p>
                <p className="text-sm text-gray-500 mb-2">{stage.hopital}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{new Date(stage.dateDebut).toLocaleDateString('fr-FR')}</span>
                  <span>→</span>
                  <span>{new Date(stage.dateFin).toLocaleDateString('fr-FR')}</span>
                </div>
                {stage.encadrant && (
                  <p className="text-xs text-gray-500 mt-2">👨‍⚕️ {stage.encadrant}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center text-gray-500">
            Aucun stage à venir avec les filtres sélectionnés
          </p>
        </div>
      )}

      {/* Calendrier annuel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* En-tête avec navigation d'année */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Calendrier annuel</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentYear(currentYear - 1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-xl font-semibold text-gray-800 min-w-[80px] text-center">
              {currentYear}
            </span>
            <button
              onClick={() => setCurrentYear(currentYear + 1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Légende */}
        {stagesFiltres.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4">
            {Array.from(new Set(stagesFiltres.map(s => s.titre))).map((titre, index) => {
              const stage = stagesFiltres.find(s => s.titre === titre);
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${stage?.color || 'bg-teal-500'}`}></div>
                  <span className="text-sm text-gray-600">{titre}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Grille des 12 mois */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {months.map((month, monthIndex) => (
            <div key={month} className="bg-gray-50 rounded-lg p-4">
              {/* Nom du mois */}
              <h3 className="text-center font-semibold text-gray-800 mb-3">
                {month}
              </h3>

              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Jours du mois */}
              <div className="grid grid-cols-7 gap-1">
                {renderMonth(monthIndex)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanningCalendar;