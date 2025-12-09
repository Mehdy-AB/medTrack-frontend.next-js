"use client";

import { MedecinCharge } from '../models/dashboard.model';

interface ChargeMedecinsChartProps {
  medecins: MedecinCharge[];
}

const ChargeMedecinsChart = ({ medecins }: ChargeMedecinsChartProps) => {
  const getBarColor = (pourcentage: number) => {
    if (pourcentage > 100) return 'bg-red-500';
    if (pourcentage >= 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Charge par médecin encadrant</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <span>Recommandé: 5 étudiants</span>
        </div>
      </div>

      <div className="space-y-4">
        {medecins.map((medecin) => (
          <div key={medecin.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{medecin.nom}</span>
              <span className="text-gray-600">
                {medecin.nbEtudiants} étudiants ({medecin.pourcentageCharge}%)
              </span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              {/* Ligne recommandée */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
                style={{ left: '100%' }}
              ></div>
              
              {/* Barre de charge */}
              <div
                className={`h-full ${getBarColor(medecin.pourcentageCharge)} transition-all duration-300 flex items-center justify-end px-3`}
                style={{ width: `${Math.min(medecin.pourcentageCharge, 100)}%` }}
              >
                <span className="text-white text-xs font-bold">
                  {medecin.nbEtudiants}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Normal (&lt;80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Élevé (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Surcharge (&gt;100%)</span>
        </div>
      </div>
    </div>
  );
};

export default ChargeMedecinsChart;