// espace-chef-service/PageVueGlobale/components/TableEvaluations.tsx

"use client";

import { useState } from 'react';
import { EvaluationEnCours } from '../models/dashboard.model';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TableEvaluationsProps {
  evaluations: EvaluationEnCours[];
}

type SortField = 'medecinNom' | 'etudiantNom' | 'stage' | 'joursRestants';
type SortOrder = 'asc' | 'desc';

const TableEvaluations = ({ evaluations }: TableEvaluationsProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedEvaluations = [...evaluations].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const getStatutStyle = (statut: string) => {
    switch (statut) {
      case 'En retard':
        return { color: 'bg-red-500', label: 'En retard' };
      case 'En cours':
        return { color: 'bg-blue-500', label: 'En cours' };
      default:
        return { color: 'bg-gray-400', label: 'À venir' };
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUp className="w-3 h-3 text-gray-400" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-teal-600" />
      : <ArrowDown className="w-3 h-3 text-teal-600" />;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Évaluations en cours</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th 
                onClick={() => handleSort('medecinNom')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Médecin
                  <SortIcon field="medecinNom" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('etudiantNom')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Étudiant
                  <SortIcon field="etudiantNom" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('stage')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Stage
                  <SortIcon field="stage" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Date début
              </th>
              <th 
                onClick={() => handleSort('joursRestants')}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Jours restants
                  <SortIcon field="joursRestants" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedEvaluations.map((evaluation) => {
              const statusStyle = getStatutStyle(evaluation.statut);
              return (
                <tr
                  key={evaluation.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {evaluation.medecinNom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {evaluation.etudiantNom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {evaluation.stage}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {evaluation.dateDebut}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    {evaluation.joursRestants > 0 ? `${evaluation.joursRestants}j` : `${Math.abs(evaluation.joursRestants)}j de retard`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${statusStyle.color}`}></div>
                      <span className="text-sm text-gray-700">
                        {statusStyle.label}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedEvaluations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">Aucune évaluation en cours</p>
        </div>
      )}
    </div>
  );
};

export default TableEvaluations;