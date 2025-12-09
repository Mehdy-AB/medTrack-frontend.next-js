"use client";

import { useState } from 'react';
import { FileText, Mail, Check, X } from 'lucide-react';
import { Candidature } from '../models/candidature.model';
import UrgentBadge from './UrgentBadge';

interface TableCandidaturesProps {
  candidatures: Candidature[];
  onView: (candidature: Candidature) => void;
  onAccept: (candidature: Candidature) => void;
  onReject: (candidature: Candidature) => void;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
}

const TableCandidatures = ({ 
  candidatures, 
  onView, 
  onAccept, 
  onReject, 
  selectedIds, 
  onSelect, 
  onSelectAll 
}: TableCandidaturesProps) => {
  const allSelected = candidatures.length > 0 && selectedIds.length === candidatures.length;

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Photo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Étudiant
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Université
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Spécialité
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Date candidature
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Ancienneté
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Documents
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {candidatures.map((candidature) => (
              <tr
                key={candidature.id}
                className={`hover:bg-gray-50 transition-colors ${candidature.prioritaire ? 'bg-red-50' : ''}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(candidature.id)}
                    onChange={() => onSelect(candidature.id)}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <img
                    src={candidature.photo}
                    alt={candidature.nom}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {candidature.nom}
                    </p>
                    <p className="text-xs text-gray-500">
                      {candidature.matricule}
                    </p>
                    <p className="text-xs text-gray-500">
                      {candidature.anneeEtude}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {candidature.universite}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {candidature.specialite}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {candidature.dateCandidature}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <UrgentBadge 
                      anciennete={candidature.anciennete} 
                      prioritaire={candidature.prioritaire}
                    />
                    <p className="text-xs text-gray-500">
                      {candidature.anciennete} jour(s)
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onView(candidature)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {candidature.documents.length}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView(candidature)}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Consulter
                    </button>
                    <button
                      onClick={() => onAccept(candidature)}
                      className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Accepter
                    </button>
                    <button
                      onClick={() => onReject(candidature)}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Refuser
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {candidatures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">Aucune candidature trouvée</p>
        </div>
      )}
    </div>
  );
};

export default TableCandidatures;