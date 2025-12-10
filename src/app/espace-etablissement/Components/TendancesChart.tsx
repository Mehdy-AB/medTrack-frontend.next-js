"use client";

import { TrendingUp, Calendar } from 'lucide-react';
import { Tendance } from '../models/tableau-bord.model';

interface TendancesChartProps {
  tendances: Tendance[];
}

const TendancesChart = ({ tendances }: TendancesChartProps) => {
  const maxCandidatures = Math.max(...tendances.map(t => t.candidatures));
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-gray-900">Évolution des candidatures</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>6 derniers mois</span>
        </div>
      </div>

      {/* Graphique */}
      <div className="h-48 relative flex items-end justify-between pt-8">
        {tendances.map((tendance, index) => {
          const height = (tendance.candidatures / maxCandidatures) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="text-center mb-2">
                <div className="text-xs text-gray-500">{tendance.mois}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {tendance.candidatures}
                </div>
              </div>
              
              {/* Barre des candidatures */}
              <div className="relative w-8">
                <div
                  className="w-8 bg-teal-500 rounded-t-lg transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
                {/* Barre des acceptations (superposée) */}
                <div
                  className="absolute bottom-0 w-8 bg-green-500 rounded-t-lg transition-all duration-500"
                  style={{ 
                    height: `${(tendance.acceptations / maxCandidatures) * 100}%` 
                  }}
                />
              </div>
              
              {/* Légende sous la barre */}
              <div className="mt-2 text-xs text-center">
                <div className="text-green-600">{tendance.acceptations} accept.</div>
                <div className="text-red-600">{tendance.rejets} rej.</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-teal-500 rounded"></div>
          <span className="text-gray-600">Candidatures</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600">Acceptations</span>
        </div>
      </div>
    </div>
  );
};

export default TendancesChart;