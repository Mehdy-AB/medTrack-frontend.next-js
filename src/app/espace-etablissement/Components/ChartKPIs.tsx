"use client";

import { BarChart3, TrendingUp } from 'lucide-react';
import { ServiceData } from '../models/tableau-bord.model';

interface ChartKPIsProps {
  services: ServiceData[];
}

const ChartKPIs = ({ services }: ChartKPIsProps) => {
  const getOccupationColor = (taux: number) => {
    if (taux < 70) return 'bg-green-500';
    if (taux <= 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const maxCapacity = Math.max(...services.map(s => s.tauxOccupation));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-gray-900">Taux d'occupation par service</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>&lt; 70%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>70-90%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>&gt; 90%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{service.nom}</span>
              <span className={`font-semibold ${getOccupationColor(service.tauxOccupation).replace('bg-', 'text-')}`}>
                {service.tauxOccupation}%
              </span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getOccupationColor(service.tauxOccupation)} rounded-full transition-all duration-500`}
                style={{ width: `${(service.tauxOccupation / maxCapacity) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{service.etudiantsActifs} étudiants</span>
              <span>Capacité: {service.capaciteMax}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartKPIs;