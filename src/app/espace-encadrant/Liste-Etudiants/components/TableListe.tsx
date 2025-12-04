// Encadrant/PageListe/components/TableListe.tsx

"use client";

import { useState } from 'react';
import { Student } from '../models/student.model';
import RowActionMenu from './RowActionMenu';

interface TableListeProps {
  students: Student[];
}

const TableListe = ({ students }: TableListeProps) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleRowHover = (studentId: string) => {
    setHoveredRow(studentId);
    setActiveMenu(studentId);
  };

  const handleRowLeave = () => {
    // Délai pour permettre le passage au menu
    setTimeout(() => {
      setHoveredRow(null);
    }, 100);
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
    setHoveredRow(null);
  };

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (statut: string) => {
    if (statut === 'En cours') return 'bg-green-500';
    if (statut === 'Terminé') return 'bg-gray-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
                Promotion
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Spécialités
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Stage actuel
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Dates (début - fin)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Note
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr
                key={student.id}
                onMouseEnter={() => handleRowHover(student.id)}
                onMouseLeave={handleRowLeave}
                className="hover:bg-gray-50 transition-colors cursor-pointer relative"
              >
                <td className="px-6 py-4">
                  <div className="relative">
                    <img
                      src={student.photo}
                      alt={student.nom}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <RowActionMenu
                      student={student}
                      isVisible={activeMenu === student.id}
                      onClose={handleMenuClose}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {student.nom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.matricule}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.promotion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.specialite}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.stageActuel}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.dateDebut} - {student.dateFin}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(student.statut)}`}></div>
                    <span className="text-sm text-gray-700">
                      {student.statut}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  {student.note ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">Aucun étudiant trouvé</p>
        </div>
      )}
    </div>
  );
};

export default TableListe;