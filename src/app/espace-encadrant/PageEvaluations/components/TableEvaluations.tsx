// Encadrant/PageEvaluations/components/TableEvaluations.tsx

"use client";

import { useState } from 'react';
import { Evaluation } from '../models/evaluation.model';
import RowActionMenu from './RowActionMenu';

interface TableEvaluationsProps {
  evaluations: Evaluation[];
  onEvaluate: (evaluation: Evaluation) => void;
}

const TableEvaluations = ({ evaluations, onEvaluate }: TableEvaluationsProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleRowEnter = (evaluationId: string) => {
    setActiveMenu(evaluationId);
  };

  const handleRowLeave = () => {
    setActiveMenu(null);
  };

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (statut: string) => {
    if (statut === 'À faire') return 'bg-orange-500';
    if (statut === 'En cours') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Fonction pour le bouton d'action
  const getActionButton = (evaluation: Evaluation) => {
    if (evaluation.statut === 'À faire') {
      return (
        <button
          onClick={() => onEvaluate(evaluation)}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Évaluer
        </button>
      );
    }
    if (evaluation.statut === 'En cours') {
      return (
        <button
          onClick={() => onEvaluate(evaluation)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
        >
          Continuer
        </button>
      );
    }
    return (
      <button
        onClick={() => onEvaluate(evaluation)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
      >
        Voir/Modifier
      </button>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Photo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Nom complet
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Matricule
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Stage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Note moyenne
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Date de dernière modif.
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Dates (début - fin)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {evaluations.map((evaluation) => (
              <tr
                key={evaluation.id}
                onMouseEnter={() => handleRowEnter(evaluation.id)}
                onMouseLeave={handleRowLeave}
                className="hover:bg-gray-50 transition-colors cursor-pointer relative"
              >
                <td className="px-6 py-4">
                  <div className="relative">
                    <img
                      src={evaluation.photo}
                      alt={evaluation.nom}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {activeMenu === evaluation.id && (
                      <RowActionMenu
                        evaluation={evaluation}
                        isVisible={true}
                        onClose={() => setActiveMenu(null)}
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {evaluation.nom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {evaluation.matricule}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {evaluation.stage}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  {evaluation.noteMoyenne ?? '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {evaluation.dateModification}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {evaluation.dateDebut} - {evaluation.dateFin}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(evaluation.statut)}`}></div>
                    <span className="text-sm text-gray-700">
                      {evaluation.statut}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getActionButton(evaluation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {evaluations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">Aucune évaluation trouvée</p>
        </div>
      )}
    </div>
  );
};

export default TableEvaluations;