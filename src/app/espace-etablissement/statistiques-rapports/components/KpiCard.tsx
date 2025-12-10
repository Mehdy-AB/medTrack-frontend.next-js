"use client";

import { TrendingUp, TrendingDown, Minus, Target, AlertTriangle, CheckCircle, Clock, Award, LucideIcon } from 'lucide-react';
import { KPI } from '../models/statistiques.model';

interface KpiCardProps {
  kpi: KPI;
  showChart?: boolean;
}

const KpiCard = ({ kpi, showChart = true }: KpiCardProps) => {
  const getTendanceIcon = () => {
    switch (kpi.tendance) {
      case 'hausse':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'baisse':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPerformanceColor = () => {
    switch (kpi.performance) {
      case 'excellente':
        return 'text-green-600 bg-green-100';
      case 'bonne':
        return 'text-blue-600 bg-blue-100';
      case 'moyenne':
        return 'text-orange-600 bg-orange-100';
      case 'faible':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getKpiIcon = (nom: string): LucideIcon => {
    if (nom.includes('conversion')) return Target;
    if (nom.includes('temps')) return Clock;
    if (nom.includes('satisfaction')) return Award;
    if (nom.includes('abandon') || nom.includes('complétion')) return CheckCircle;
    return AlertTriangle;
  };

  const performanceColor = getPerformanceColor();
  const KpiIcon = getKpiIcon(kpi.nom);

  // Graphique simplifié sans Recharts pour éviter les erreurs
  const renderSimpleChart = () => {
    if (!showChart || kpi.historique.length === 0) return null;

    const maxValue = Math.max(...kpi.historique.map(h => h.valeur));
    const minValue = Math.min(...kpi.historique.map(h => h.valeur));
    const range = maxValue - minValue;

    return (
      <div className="h-32 relative">
        <div className="absolute inset-0 flex items-end">
          {kpi.historique.map((point, index) => {
            const height = range > 0 ? ((point.valeur - minValue) / range) * 100 : 50;
            const width = 100 / kpi.historique.length;
            
            return (
              <div
                key={index}
                className="relative"
                style={{ width: `${width}%` }}
              >
                <div
                  className={`w-3/4 mx-auto rounded-t ${
                    kpi.variation >= 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 text-center mt-1">
                  {point.date.split('-')[1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${performanceColor.split(' ')[1]} rounded-lg`}>
            <KpiIcon className={`w-5 h-5 ${performanceColor.split(' ')[0]}`} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{kpi.nom}</h4>
            <p className="text-sm text-gray-500">Cible: {kpi.seuilCible}{kpi.unite}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getTendanceIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${performanceColor}`}>
            {kpi.performance.charAt(0).toUpperCase() + kpi.performance.slice(1)}
          </span>
        </div>
      </div>

      {/* Valeur et variation */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            {kpi.valeur.toFixed(kpi.unite === '%' ? 1 : 1)}
          </span>
          <span className="text-lg text-gray-600">{kpi.unite}</span>
          <span className={`ml-2 text-sm font-medium ${
            kpi.variation > 0 ? 'text-green-600' : kpi.variation < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {kpi.variation > 0 ? '+' : ''}{kpi.variation.toFixed(1)}%
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          vs période précédente
        </div>
      </div>

      {/* Graphique mini */}
      {renderSimpleChart()}

      {/* Historique des valeurs */}
      {kpi.historique.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Historique</div>
          <div className="flex justify-between">
            {kpi.historique.map((point, index) => (
              <div key={index} className="text-center">
                <div className="text-xs font-medium">{point.valeur.toFixed(1)}</div>
                <div className="text-xs text-gray-500">{point.date.split('-')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Légende */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              kpi.variation >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span>Tendance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Cible: {kpi.seuilCible}{kpi.unite}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;