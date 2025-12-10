"use client";

import { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Minus, BarChart3, Target, Users, Award, LucideIcon } from 'lucide-react';
import { Periode } from '../models/statistiques.model';

interface ComparisonPanelProps {
  periodeActuelle: Periode;
  periodeComparaison: Periode;
  metriques: {
    label: string;
    valeurActuelle: number;
    valeurComparaison: number;
    unite?: string;
    tendance: 'hausse' | 'baisse' | 'stable';
  }[];
  onPeriodeChange: (periode: Periode) => void;
}

const ComparisonPanel = ({ 
  periodeActuelle, 
  periodeComparaison, 
  metriques,
  onPeriodeChange 
}: ComparisonPanelProps) => {
  const [showPeriodeSelector, setShowPeriodeSelector] = useState(false);

  const calculerVariation = (actuel: number, comparatif: number) => {
    if (comparatif === 0) return 0;
    return ((actuel - comparatif) / comparatif) * 100;
  };

  const getVariationConfig = (variation: number) => {
    if (variation > 0) {
      return {
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        label: `+${variation.toFixed(1)}%`
      };
    } else if (variation < 0) {
      return {
        icon: TrendingDown,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        label: `${variation.toFixed(1)}%`
      };
    } else {
      return {
        icon: Minus,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        label: '0%'
      };
    }
  };

  const getMetricIcon = (label: string): LucideIcon => {
    if (label.includes('annonce')) return BarChart3;
    if (label.includes('candidature')) return Users;
    if (label.includes('conversion')) return Target;
    return Award;
  };

  const periodesOptions: Periode[] = [
    { id: 'P1', label: 'Mois précédent', dateDebut: '2024-01-01', dateFin: '2024-01-31' },
    { id: 'P2', label: 'Trimestre précédent', dateDebut: '2023-10-01', dateFin: '2023-12-31' },
    { id: 'P3', label: 'Année précédente', dateDebut: '2023-01-01', dateFin: '2023-12-31' },
    { id: 'P4', label: 'Même période l\'an dernier', dateDebut: '2023-02-01', dateFin: '2023-02-28' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Comparaison de Périodes</h3>
          <p className="text-sm text-gray-500">
            Analyse comparative avec variations automatiques
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowPeriodeSelector(!showPeriodeSelector)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
          >
            <Calendar className="w-4 h-4" />
            {periodeComparaison.label}
          </button>
          
          {showPeriodeSelector && (
            <div className="absolute top-full mt-2 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {periodesOptions.map((periode) => (
                <button
                  key={periode.id}
                  onClick={() => {
                    onPeriodeChange(periode);
                    setShowPeriodeSelector(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    periodeComparaison.id === periode.id 
                      ? 'text-teal-700 bg-teal-50' 
                      : 'text-gray-700'
                  }`}
                >
                  {periode.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Périodes */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-800">Période actuelle</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{periodeActuelle.label}</div>
          <div className="text-sm text-teal-600">
            {new Date(periodeActuelle.dateDebut).toLocaleDateString('fr-FR')} → {new Date(periodeActuelle.dateFin).toLocaleDateString('fr-FR')}
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Période de comparaison</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{periodeComparaison.label}</div>
          <div className="text-sm text-blue-600">
            {new Date(periodeComparaison.dateDebut).toLocaleDateString('fr-FR')} → {new Date(periodeComparaison.dateFin).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>

      {/* Métriques comparatives */}
      <div className="space-y-4">
        {metriques.map((metrique, index) => {
          const variation = calculerVariation(metrique.valeurActuelle, metrique.valeurComparaison);
          const variationConfig = getVariationConfig(variation);
          const VariationIcon = variationConfig.icon;
          const MetricIcon = getMetricIcon(metrique.label);

          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <MetricIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">{metrique.label}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${variationConfig.bgColor} ${variationConfig.color}`}>
                  <VariationIcon className="w-4 h-4" />
                  {variationConfig.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Période actuelle</div>
                  <div className="text-lg font-bold text-gray-900">
                    {metrique.valeurActuelle.toFixed(1)}
                    {metrique.unite && <span className="text-gray-600">{metrique.unite}</span>}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Période comparaison</div>
                  <div className="text-lg font-bold text-gray-900">
                    {metrique.valeurComparaison.toFixed(1)}
                    {metrique.unite && <span className="text-gray-600">{metrique.unite}</span>}
                  </div>
                </div>
              </div>

              {/* Barre de comparaison */}
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500"
                  style={{ 
                    width: `${Math.min(100, (metrique.valeurActuelle / (metrique.valeurComparaison || 1)) * 50)}%` 
                  }}
                ></div>
                <div 
                  className="h-full bg-blue-500"
                  style={{ 
                    width: `${Math.min(100, (metrique.valeurComparaison / (metrique.valeurActuelle || 1)) * 50)}%`,
                    marginLeft: '50%'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Résumé */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Analyse globale</h4>
            <p className="text-sm text-gray-500">
              {metriques.filter(m => m.tendance === 'hausse').length} indicateurs en hausse, 
              {' '}{metriques.filter(m => m.tendance === 'baisse').length} en baisse
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {metriques.filter(m => m.tendance === 'hausse').length > metriques.filter(m => m.tendance === 'baisse').length 
                ? '📈 Performance positive' 
                : '📉 Performance à surveiller'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;