"use client";

import { User, Calendar, FileText, CheckCircle, Clock, AlertTriangle, Send, Eye, Download, Building, Award, Mail, Phone, GraduationCap } from 'lucide-react';
import { Candidature } from '../models/candidature.model';
import { useState } from 'react';

interface CandidatureCardProps {
  candidature: Candidature;
  onViewDetail: () => void;
  onPreValidate: () => void;
  onTransmit: () => void;
  onViewProfile: () => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const CandidatureCard = ({
  candidature,
  onViewDetail,
  onPreValidate,
  onTransmit,
  onViewProfile,
  isSelected = false,
  onSelect
}: CandidatureCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusConfig = (statut: Candidature['statut']) => {
    switch (statut) {
      case 'en_attente':
        return { color: 'bg-orange-100 text-orange-800', icon: Clock, label: 'En attente' };
      case 'pre_validee':
        return { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Pré-validée' };
      case 'transmise_service':
        return { color: 'bg-purple-100 text-purple-800', icon: Send, label: 'Transmise' };
      case 'acceptee_chef':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Acceptée' };
      case 'refusee_chef':
        return { color: 'bg-red-100 text-red-800', icon: AlertTriangle, label: 'Refusée' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: statut };
    }
  };

  const statusConfig = getStatusConfig(candidature.statut);
  const StatusIcon = statusConfig.icon;

  const getEligibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDocumentsStatut = () => {
    const total = candidature.documents.length;
    const valides = candidature.documents.filter(d => d.statut === 'valide').length;
    return { total, valides };
  };

  const documentsStatut = getDocumentsStatut();

  return (
    <div className={`bg-white rounded-xl border ${isSelected ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-gray-200'} p-6 hover:shadow-lg transition-shadow relative`}>
      {/* Checkbox pour sélection multiple */}
      {onSelect && (
        <div className="absolute top-4 right-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(candidature.id)}
            className="w-5 h-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500 cursor-pointer"
          />
        </div>
      )}

      {/* En-tête avec info étudiant */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-teal-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-lg">
              {candidature.etudiant.prenom} {candidature.etudiant.nom}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color} flex items-center gap-1`}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig.label}
            </span>
          </div>
          <p className="text-sm text-gray-600">{candidature.etudiant.email}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              {candidature.etudiant.universite}
            </span>
            <span>•</span>
            <span>{candidature.etudiant.specialite}</span>
            <span>•</span>
            <span>Année {candidature.etudiant.anneeEtude}</span>
          </div>
        </div>
      </div>

      {/* Informations stage */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-medium text-gray-900">{candidature.annonceTitre}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="w-4 h-4" />
              <span>{candidature.serviceNom}</span>
              <span>•</span>
              <span>{candidature.hopitalNom}</span>
            </div>
          </div>
          <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
            {candidature.niveauEtude}
          </span>
        </div>
      </div>

      {/* Documents et éligibilité */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Documents</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-lg font-bold ${documentsStatut.valides === documentsStatut.total ? 'text-green-600' : 'text-orange-600'}`}>
              {documentsStatut.valides}/{documentsStatut.total}
            </span>
            <span className="text-sm text-blue-600">complets</span>
          </div>
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Éligibilité</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            <span className={getEligibilityColor(candidature.scoreEligibilite)}>
              {candidature.scoreEligibilite}%
            </span>
          </div>
        </div>
      </div>

      {/* Dates et actions */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">
            Soumis le {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR')}
          </span>
        </div>
        
        {candidature.datePreValidation && (
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span className="text-blue-600">
              Pré-validé le {new Date(candidature.datePreValidation).toLocaleDateString('fr-FR')}
            </span>
          </div>
        )}

        {candidature.dateTransmission && (
          <div className="flex items-center gap-2 text-sm">
            <Send className="w-4 h-4 text-purple-400" />
            <span className="text-purple-600">
              Transmis le {new Date(candidature.dateTransmission).toLocaleDateString('fr-FR')}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onViewDetail}
          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Détails
        </button>
        
        {candidature.statut === 'en_attente' && (
          <button
            onClick={onPreValidate}
            className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Pré-valider
          </button>
        )}

        {candidature.statut === 'pre_validee' && (
          <button
            onClick={onTransmit}
            className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Transmettre
          </button>
        )}

        <button
          onClick={onViewProfile}
          className="flex-1 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4" />
          Profil
        </button>
      </div>
    </div>
  );
};

export default CandidatureCard;