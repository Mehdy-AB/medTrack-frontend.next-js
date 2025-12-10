"use client";

import { ChevronUp, ChevronDown, User, Calendar, FileText, CheckCircle, Send, Eye, Download, Mail, Phone, Building, Award } from 'lucide-react';
import { Candidature } from '../models/candidature.model';
import { useState } from 'react';

interface CandidatureTableProps {
  candidatures: Candidature[];
  onViewDetail: (candidature: Candidature) => void;
  onPreValidate: (candidature: Candidature) => void;
  onTransmit: (candidature: Candidature) => void;
  onViewProfile: (candidature: Candidature) => void;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
}

type SortField = keyof Candidature;
type SortDirection = 'asc' | 'desc';

const CandidatureTable = ({
  candidatures,
  onViewDetail,
  onPreValidate,
  onTransmit,
  onViewProfile,
  selectedIds,
  onSelect,
  onSelectAll
}: CandidatureTableProps) => {
  const [sortField, setSortField] = useState<SortField>('dateSoumission');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCandidatures = [...candidatures].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const getStatusBadge = (statut: Candidature['statut']) => {
    switch (statut) {
      case 'en_attente':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">En attente</span>;
      case 'pre_validee':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Pré-validée</span>;
      case 'transmise_service':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Transmise</span>;
      case 'acceptee_chef':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Acceptée</span>;
      case 'refusee_chef':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Refusée</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{statut}</span>;
    }
  };

  const getEligibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-30" />;
    
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const allSelected = candidatures.length > 0 && selectedIds.length === candidatures.length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
              />
            </th>
            {[
              { label: 'Étudiant', field: 'etudiant' as SortField },
              { label: 'Stage', field: 'annonceTitre' as SortField },
              { label: 'Service/Hôpital', field: 'serviceNom' as SortField },
              { label: 'Date Soumission', field: 'dateSoumission' as SortField },
              { label: 'Statut', field: 'statut' as SortField },
              { label: 'Éligibilité', field: 'scoreEligibilite' as SortField },
              { label: 'Documents', field: 'documents' as SortField },
              { label: 'Actions' }
            ].map(({ label, field }) => (
              <th key={field || label} className="px-4 py-3 text-left">
                {field ? (
                  <button
                    onClick={() => handleSort(field)}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase hover:text-gray-900 group"
                  >
                    {label}
                    <SortIcon field={field} />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-gray-700 uppercase">
                    {label}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedCandidatures.map((candidature) => {
            const documentsValides = candidature.documents.filter(d => d.statut === 'valide').length;
            const documentsTotal = candidature.documents.length;
            
            return (
              <tr key={candidature.id} className="hover:bg-gray-50 transition-colors">
                {/* Checkbox */}
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(candidature.id)}
                    onChange={() => onSelect(candidature.id)}
                    className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                  />
                </td>

                {/* Étudiant */}
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-900">
                      {candidature.etudiant.prenom} {candidature.etudiant.nom}
                    </div>
                    <div className="text-xs text-gray-500">
                      {candidature.etudiant.universite}
                    </div>
                    <div className="text-xs text-gray-500">
                      {candidature.etudiant.specialite} - Année {candidature.etudiant.anneeEtude}
                    </div>
                  </div>
                </td>

                {/* Stage */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{candidature.annonceTitre}</div>
                  <div className="text-xs text-gray-500">
                    Niveau: {candidature.niveauEtude}
                  </div>
                </td>

                {/* Service/Hôpital */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{candidature.serviceNom}</div>
                  <div className="text-xs text-gray-500">{candidature.hopitalNom}</div>
                </td>

                {/* Date Soumission */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">
                    {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(candidature.dateSoumission).toLocaleTimeString('fr-FR')}
                  </div>
                </td>

                {/* Statut */}
                <td className="px-4 py-3">
                  {getStatusBadge(candidature.statut)}
                </td>

                {/* Éligibilité */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className={`font-bold ${getEligibilityColor(candidature.scoreEligibilite)}`}>
                      {candidature.scoreEligibilite}%
                    </span>
                  </div>
                </td>

                {/* Documents */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{documentsValides}</span>
                    <span className="text-sm text-gray-500">/{documentsTotal}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {documentsValides === documentsTotal ? 'Complets' : 'Incomplets'}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetail(candidature)}
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {candidature.statut === 'en_attente' && (
                      <button
                        onClick={() => onPreValidate(candidature)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Pré-valider"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}

                    {candidature.statut === 'pre_validee' && (
                      <button
                        onClick={() => onTransmit(candidature)}
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Transmettre"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => onViewProfile(candidature)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Voir profil"
                    >
                      <User className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatureTable;