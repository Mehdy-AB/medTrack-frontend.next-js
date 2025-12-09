// src/app/espace-encadrant/PagePresences/components/TablePresences.tsx

"use client";

import { useState } from 'react';
import { Presence, PresenceStatus } from '../models/presence.model';
import RowActionMenu from './RowActionMenu';

interface TablePresencesProps {
  presences: Presence[];
  onPresenceChange: (presenceId: string, newStatus: PresenceStatus) => void;
}

const TablePresences = ({ presences, onPresenceChange }: TablePresencesProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleRowEnter = (presenceId: string) => {
    setActiveMenu(presenceId);
  };

  const handleRowLeave = () => {
    setActiveMenu(null);
  };

  const getNextStatus = (currentStatus: PresenceStatus): PresenceStatus => {
    const statusCycle: PresenceStatus[] = ['Non marqué', 'Présent', 'Absent justifié', 'Absent non justifié', 'Retard'];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    return statusCycle[nextIndex];
  };

  const getStatusStyle = (statut: PresenceStatus) => {
    switch (statut) {
      case 'Présent':
        return { color: 'bg-green-500', label: 'Présent' };
      case 'Absent justifié':
        return { color: 'bg-orange-500', label: 'Absent justifié' };
      case 'Absent non justifié':
        return { color: 'bg-red-500', label: 'Absent non justifié' };
      case 'Retard':
        return { color: 'bg-yellow-500', label: 'Retard' };
      default:
        return { color: 'bg-gray-400', label: 'Non marqué' };
    }
  };

  const handlePresenceClick = (presence: Presence) => {
    const nextStatus = getNextStatus(presence.statut);
    onPresenceChange(presence.id, nextStatus);
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
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Présence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {presences.map((presence) => {
              const statusStyle = getStatusStyle(presence.statut);
              return (
                <tr
                  key={presence.id}
                  onMouseEnter={() => handleRowEnter(presence.id)}
                  onMouseLeave={handleRowLeave}
                  className="hover:bg-gray-50 transition-colors cursor-pointer relative"
                >
                  <td className="px-6 py-4">
                    <div className="relative">
                      <img
                        src={presence.photo}
                        alt={presence.nom}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {activeMenu === presence.id && (
                        <RowActionMenu
                          presence={presence}
                          isVisible={true}
                          onClose={() => setActiveMenu(null)}
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {presence.nom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {presence.matricule}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {presence.stage}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {presence.date}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handlePresenceClick(presence)}
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                      <div className={`w-3 h-3 rounded-full ${statusStyle.color}`}></div>
                      <span className="text-sm text-gray-700 font-medium">
                        {statusStyle.label}
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {presences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">Aucune présence trouvée</p>
        </div>
      )}
    </div>
  );
};

export default TablePresences;