"use client";

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '../models/tableau-bord.model';

interface KPICardProps {
  kpi: KPI;
}

const KPICard = ({ kpi }: KPICardProps) => {
  const getColorClass = () => {
    switch (kpi.couleur) {
      case 'vert': return 'bg-green-100 text-green-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      case 'rouge': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-bold text-gray-900">
              {kpi.valeur}{kpi.unite || ''}
            </span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getColorClass()}`}>
              {kpi.evolution > 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : kpi.evolution < 0 ? (
                <TrendingDown className="w-3 h-3" />
              ) : (
                <Minus className="w-3 h-3" />
              )}
              <span>{Math.abs(kpi.evolution)}%</span>
            </div>
          </div>
        </div>
        <div className="text-2xl">{kpi.icone}</div>
      </div>
      <div className="text-xs text-gray-500">
        vs période précédente
      </div>
    </div>
  );
};

export default KPICard;