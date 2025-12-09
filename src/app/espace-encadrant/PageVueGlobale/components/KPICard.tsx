"use client";

import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPI } from '../models/dashboard.model';

interface KPICardProps {
  kpi: KPI;
}

const KPICard = ({ kpi }: KPICardProps) => {
  const isPositive = kpi.evolution >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${kpi.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
          {kpi.icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(kpi.evolution)}%
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-gray-900 mb-1">
        {kpi.label.includes('Taux') ? `${kpi.value}%` : kpi.value}
      </h3>
      <p className="text-sm text-gray-600">{kpi.label}</p>
    </div>
  );
};

export default KPICard;