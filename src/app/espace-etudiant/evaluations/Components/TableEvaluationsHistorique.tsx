"use client";

import { EvaluationHistorique } from '../models/evaluationHistorique.model';
import { Download } from 'lucide-react';

interface TableEvaluationsHistoriqueProps {
  evaluations: EvaluationHistorique[];
}

const TableEvaluationsHistorique = ({ evaluations }: TableEvaluationsHistoriqueProps) => {
  const handleDownload = (encadrant: string, periode: string) => {
    // Logique de téléchargement du PDF
    console.log(`Téléchargement de l'évaluation de ${encadrant} (${periode})`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Encadrant
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Hôpital / Service
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Période Stage
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date évaluation
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Note /20
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Commentaire
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Télécharger
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {evaluations.map((evaluation, index) => (
              <tr 
                key={index} 
                className={`hover:bg-gray-50 transition-colors ${
                  evaluation.statut === 'En cours' ? 'bg-teal-50/30' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {evaluation.encadrant}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 whitespace-pre-line">
                    {evaluation.hopitalService}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs text-gray-600">
                    {evaluation.periodeStage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {evaluation.dateEvaluation}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {evaluation.note}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {evaluation.commentaire}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    evaluation.statut === 'En cours'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {evaluation.statut}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDownload(evaluation.encadrant, evaluation.periodeStage)}
                    className="p-2 text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Télécharger l'évaluation"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEvaluationsHistorique;