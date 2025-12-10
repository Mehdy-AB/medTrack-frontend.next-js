// espace-chef-service/PageVueGlobale/components/EvolutionChart.tsx

"use client";

import { EvolutionData } from '../models/dashboard.model';

interface EvolutionChartProps {
  data: EvolutionData[];
}

const EvolutionChart = ({ data }: EvolutionChartProps) => {
  const maxValue = Math.max(...data.flatMap(d => [d.etudiants, d.candidatures]));
  const scale = 100 / maxValue;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Évolution temporelle</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Étudiants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded"></div>
            <span className="text-gray-600">Candidatures</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        {/* Grille horizontale */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 25, 50, 75, 100].reverse().map((value) => (
            <div key={value} className="flex items-center">
              <span className="text-xs text-gray-400 w-8">{Math.round(maxValue * value / 100)}</span>
              <div className="flex-1 border-t border-gray-200 ml-2"></div>
            </div>
          ))}
        </div>

        {/* Barres */}
        <div className="absolute inset-0 flex items-end justify-around pt-6 pl-10">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-end gap-1 h-full w-full justify-center">
                {/* Barre étudiants */}
                <div className="relative group">
                  <div
                    className="w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${item.etudiants * scale}%` }}
                  ></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.etudiants} étudiants
                  </div>
                </div>

                {/* Barre candidatures */}
                <div className="relative group">
                  <div
                    className="w-8 bg-teal-500 rounded-t hover:bg-teal-600 transition-colors"
                    style={{ height: `${item.candidatures * scale}%` }}
                  ></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.candidatures} candidatures
                  </div>
                </div>
              </div>
              
              {/* Label mois */}
              <span className="text-xs text-gray-600 font-medium">{item.mois}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvolutionChart;