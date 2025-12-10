"use client";

import { ChevronUp, ChevronDown, Users, Calendar, Clock, Eye, Edit, Copy, MoreVertical, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { AnnonceStage } from '../models/annonce.model';
import { useState } from 'react';

interface TableAnnoncesProps {
  annonces: AnnonceStage[];
  onEdit: (annonce: AnnonceStage) => void;
  onViewDetail: (annonce: AnnonceStage) => void;
  onDuplicate: (annonce: AnnonceStage) => void;
  onValidate: (annonce: AnnonceStage) => void;
}

type SortField = keyof AnnonceStage;
type SortDirection = 'asc' | 'desc';

const TableAnnonces = ({ annonces, onEdit, onViewDetail, onDuplicate, onValidate }: TableAnnoncesProps) => {
  const [sortField, setSortField] = useState<SortField>('dateLimiteCandidature');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAnnonces = [...annonces].sort((a, b) => {
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
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
    }
    
    return 0;
  });

  const getStatusBadge = (statut: AnnonceStage['statut']) => {
    switch (statut) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>;
      case 'publiée':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Publiée</span>;
      case 'brouillon':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Brouillon</span>;
      case 'clôturée':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Clôturée</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{statut}</span>;
    }
  };

  const getStageStatusBadge = (statutStage?: AnnonceStage['statutStage']) => {
    switch (statutStage) {
      case 'en_cours':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">En cours</span>;
      case 'termine':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Terminé</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Non débuté</span>;
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-30" />;
    
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const getDaysLeft = (dateLimite: string) => {
    const dateLimiteObj = new Date(dateLimite);
    const maintenant = new Date();
    const diffTime = dateLimiteObj.getTime() - maintenant.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getNoteMoyenne = (notes?: (number | null)[]) => {
    if (!notes || notes.length === 0) return null;
    const notesValides = notes.filter(note => note !== null) as number[];
    if (notesValides.length === 0) return null;
    return notesValides.reduce((acc, note) => acc + note, 0) / notesValides.length;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {[
              { label: 'Titre', field: 'titre' as SortField },
              { label: 'Service', field: 'serviceNom' as SortField },
              { label: 'Hôpital', field: 'hopitalNom' as SortField },
              { label: 'Date Limite', field: 'dateLimiteCandidature' as SortField },
              { label: 'Places', field: 'placesDisponibles' as SortField },
              { label: 'Validations', field: 'validationChef' as SortField },
              { label: 'Statut Stage', field: 'statutStage' as SortField },
              { label: 'Note Moy.', field: 'notes' as SortField },
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
          {sortedAnnonces.map((annonce) => {
            const daysLeft = getDaysLeft(annonce.dateLimiteCandidature);
            const noteMoyenne = getNoteMoyenne(annonce.notes);
            
            return (
              <tr key={annonce.id} className="hover:bg-gray-50 transition-colors">
                {/* Titre */}
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-900">{annonce.titre}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{annonce.description}</div>
                    {annonce.isNew && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">
                        NEW
                      </span>
                    )}
                  </div>
                </td>

                {/* Service */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{annonce.serviceNom}</div>
                </td>

                {/* Hôpital */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{annonce.hopitalNom}</div>
                </td>

                {/* Date limite */}
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(annonce.dateLimiteCandidature).toLocaleDateString('fr-FR')}
                    </div>
                    <div className={`text-xs ${
                      daysLeft <= 7 ? 'text-red-600 font-medium' :
                      daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {daysLeft > 0 ? `${daysLeft} jours restants` : 'Expirée'}
                    </div>
                  </div>
                </td>

                {/* Places */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{annonce.placesDisponibles}</span>
                    <span className="text-sm text-gray-500">/{annonce.placesTotal}</span>
                  </div>
                </td>

                {/* Validations */}
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {annonce.validationChef ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                      <span className={`text-sm ${annonce.validationChef ? 'text-green-600' : 'text-orange-600'}`}>
                        Chef
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {annonce.validationEtablissement ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-blue-500" />
                      )}
                      <span className={`text-sm ${annonce.validationEtablissement ? 'text-green-600' : 'text-blue-600'}`}>
                        Établissement
                      </span>
                    </div>
                  </div>
                </td>

                {/* Statut Stage */}
                <td className="px-4 py-3">
                  {getStageStatusBadge(annonce.statutStage)}
                </td>

                {/* Note Moyenne */}
                <td className="px-4 py-3">
                  {noteMoyenne !== null ? (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-900">{noteMoyenne.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">/20</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetail(annonce)}
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(annonce)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDuplicate(annonce)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Dupliquer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    
                    {/* Bouton validation */}
                    {(annonce.statut === 'publiée' && (!annonce.validationChef || !annonce.validationEtablissement)) && (
                      <button
                        onClick={() => onValidate(annonce)}
                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Valider"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
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

export default TableAnnonces;