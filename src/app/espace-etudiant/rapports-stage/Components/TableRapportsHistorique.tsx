"use client";

import { Download } from 'lucide-react';

export interface RapportHistorique {
  date: string;
  nomFichier: string;
  statut: 'accepté' | 'en attente' | 'refusé';
  commentaire?: string;
}

interface TableRapportsHistoriqueProps {
  rapports: RapportHistorique[];
}

const TableRapportsHistorique = ({ rapports }: TableRapportsHistoriqueProps) => {
  const handleDownload = (nomFichier: string) => {
    // Logique de téléchargement du PDF
    console.log(`Téléchargement du rapport: ${nomFichier}`);
    // Plus tard: appel API pour télécharger le fichier
  };

  const getStatutStyle = (statut: string) => {
    switch (statut) {
      case 'accepté':
        return 'bg-green-50 text-green-700';
      case 'en attente':
        return 'bg-yellow-50 text-yellow-700';
      case 'refusé':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Nom du fichier
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rapports.length > 0 ? (
              rapports.map((rapport, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-gray-50 transition-colors ${
                    rapport.statut === 'en attente' ? 'bg-yellow-50/20' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {rapport.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {rapport.nomFichier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutStyle(rapport.statut)}`}>
                      {rapport.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(rapport.nomFichier)}
                      className="p-2 text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Télécharger le rapport"
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Aucun rapport soumis pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRapportsHistorique;