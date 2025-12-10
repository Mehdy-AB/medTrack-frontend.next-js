"use client";

import { useState } from 'react';
import { FileText, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { RapportEtudiant } from '../models/rapport.model';
import RowActionMenu from './RowActionMenu';

interface TableRapportsProps {
  rapports: RapportEtudiant[];
  onView: (rapport: RapportEtudiant) => void;
  onDownload: (rapport: RapportEtudiant) => void;
  onMessage: (rapport: RapportEtudiant) => void;
  onEvaluate: (rapport: RapportEtudiant) => void;
  onList: (rapport: RapportEtudiant) => void;
}

const TableRapports = ({ 
  rapports, 
  onView, 
  onDownload,
  onMessage,
  onEvaluate,
  onList 
}: TableRapportsProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'complet':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'incomplet':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'en_attente':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'complet':
        return 'bg-green-100 text-green-800';
      case 'incomplet':
        return 'bg-red-100 text-red-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowEnter = (rapportId: string) => {
    setActiveMenu(rapportId);
  };

  const handleRowLeave = () => {
    setActiveMenu(null);
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
                Étudiant
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Stage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Période
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Type de rapport
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Date soumission
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Documents
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Note
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rapports.map((rapport) => (
              <tr
                key={rapport.id}
                onMouseEnter={() => handleRowEnter(rapport.id)}
                onMouseLeave={handleRowLeave}
                className="hover:bg-gray-50 transition-colors cursor-pointer relative"
              >
                <td className="px-6 py-4">
                  <div className="relative">
                    <img
                      src={rapport.photo}
                      alt={rapport.nom}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {activeMenu === rapport.id && (
                      <RowActionMenu
                        rapport={rapport}
                        isVisible={true}
                        onClose={() => setActiveMenu(null)}
                        onView={onView}
                        onDownload={onDownload}
                        onMessage={onMessage}
                        onEvaluate={onEvaluate}
                        onList={onList}
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">{rapport.nom}</p>
                    <p className="text-xs text-gray-500">{rapport.matricule}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {rapport.stage}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {rapport.periode}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {rapport.typeRapport}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {rapport.dateSoumission}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(rapport.statut)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rapport.statut)}`}>
                      {rapport.statut}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{rapport.documents.length}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {rapport.noteGenerale ? `${rapport.noteGenerale}/20` : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView(rapport)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Consulter"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDownload(rapport)}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      title="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rapports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">Aucun rapport trouvé</p>
        </div>
      )}
    </div>
  );
};

export default TableRapports;