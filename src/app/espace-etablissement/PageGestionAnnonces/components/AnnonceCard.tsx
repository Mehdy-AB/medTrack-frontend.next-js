"use client";

import { Calendar, Users, MapPin, Clock, Eye, Edit, Copy, Trash2, MoreVertical, Bell, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { AnnonceStage } from '../models/annonce.model';
import { useState } from 'react';

interface AnnonceCardProps {
  annonce: AnnonceStage;
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onValidate: () => void;
  onChangeStatut: (statut: AnnonceStage['statut']) => void;
  onTerminer: () => void;
}

const AnnonceCard = ({ 
  annonce, 
  onViewDetail, 
  onEdit, 
  onDelete, 
  onDuplicate,
  onValidate,
  onChangeStatut,
  onTerminer 
}: AnnonceCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (statut: AnnonceStage['statut']) => {
    switch (statut) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'publiée': return 'bg-blue-100 text-blue-800';
      case 'brouillon': return 'bg-gray-100 text-gray-800';
      case 'clôturée': return 'bg-red-100 text-red-800';
      case 'archivée': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (statut: AnnonceStage['statut']) => {
    switch (statut) {
      case 'active': return 'Active';
      case 'publiée': return 'Publiée';
      case 'brouillon': return 'Brouillon';
      case 'clôturée': return 'Clôturée';
      case 'archivée': return 'Archivée';
      default: return statut;
    }
  };

  const getStageStatusColor = (statutStage?: AnnonceStage['statutStage']) => {
    switch (statutStage) {
      case 'en_cours': return 'bg-green-100 text-green-800';
      case 'termine': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageStatusLabel = (statutStage?: AnnonceStage['statutStage']) => {
    switch (statutStage) {
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      default: return 'Non débuté';
    }
  };

  const getDaysLeft = () => {
    const dateLimite = new Date(annonce.dateLimiteCandidature);
    const maintenant = new Date();
    const diffTime = dateLimite.getTime() - maintenant.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysLeft();

  // Calculer la note moyenne
  const getNoteMoyenne = () => {
    if (!annonce.notes || annonce.notes.length === 0) return null;
    const notesValides = annonce.notes.filter(note => note !== null) as number[];
    if (notesValides.length === 0) return null;
    return notesValides.reduce((acc, note) => acc + note, 0) / notesValides.length;
  };

  const noteMoyenne = getNoteMoyenne();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow relative">
      {/* Badge "New" */}
      {annonce.isNew && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          NEW
        </div>
      )}

      {/* Badge de statut de stage */}
      <div className="absolute top-4 left-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageStatusColor(annonce.statutStage)}`}>
          {getStageStatusLabel(annonce.statutStage)}
        </span>
      </div>

      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium">
              {annonce.typeStage}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(annonce.statut)}`}>
              {getStatusLabel(annonce.statut)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{annonce.titre}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{annonce.description}</p>
        </div>
        
        {/* Menu déroulant */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => {
                  onViewDetail();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Voir détails
              </button>
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              <button
                onClick={() => {
                  onDuplicate();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Dupliquer
              </button>
              
              {/* Actions de validation */}
              {annonce.statut === 'publiée' && !annonce.validationChef && (
                <button
                  onClick={() => {
                    onValidate();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Valider chef
                </button>
              )}

              {annonce.statut === 'publiée' && annonce.validationChef && !annonce.validationEtablissement && (
                <button
                  onClick={() => {
                    onValidate();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Valider établissement
                </button>
              )}

              {/* Actions de statut */}
              <div className="border-t border-gray-200 my-1"></div>
              {annonce.statut !== 'active' && annonce.statutStage === 'non_debute' && (
                <button
                  onClick={() => {
                    onChangeStatut('active');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Activer
                </button>
              )}
              
              {annonce.statutStage === 'en_cours' && (
                <button
                  onClick={() => {
                    onTerminer();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Terminer le stage
                </button>
              )}

              {annonce.statut !== 'clôturée' && (
                <button
                  onClick={() => {
                    onChangeStatut('clôturée');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Clôturer
                </button>
              )}
              
              <div className="border-t border-gray-200 my-1"></div>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Informations principales */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">{annonce.serviceNom} - {annonce.hopitalNom}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">
            {new Date(annonce.dateDebut).toLocaleDateString('fr-FR')} → {new Date(annonce.dateFin).toLocaleDateString('fr-FR')}
            <span className="ml-2 text-gray-500">({annonce.dureeSemaines} semaines)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className={`font-medium ${daysLeft <= 7 ? 'text-red-600' : daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'}`}>
            Date limite: {new Date(annonce.dateLimiteCandidature).toLocaleDateString('fr-FR')}
            {daysLeft > 0 && (
              <span className="ml-2">({daysLeft} jours)</span>
            )}
          </span>
        </div>

        {/* Horaire */}
        <div className="text-sm text-gray-600">
          Horaire: {annonce.horaireQuotidien.heureDebut} - {annonce.horaireQuotidien.heureFin}
          <span className="ml-2 text-gray-500">
            ({annonce.horaireQuotidien.joursTravail.length} jours/semaine)
          </span>
        </div>
      </div>

      {/* Capacité et candidatures */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Places</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-gray-900">
              {annonce.placesDisponibles}/{annonce.placesTotal}
            </span>
            <span className="text-sm text-gray-500">disponibles</span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Candidatures</div>
          <div className="text-lg font-semibold text-gray-900">
            {annonce.candidaturesEnAttente + annonce.candidaturesAcceptees + annonce.candidaturesRefusees}
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Occupation</span>
          <span>{Math.round(((annonce.placesTotal - annonce.placesDisponibles) / annonce.placesTotal) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              annonce.placesDisponibles > annonce.placesTotal * 0.3 ? 'bg-green-500' :
              annonce.placesDisponibles > 0 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ 
              width: `${((annonce.placesTotal - annonce.placesDisponibles) / annonce.placesTotal) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Validations */}
      <div className="mb-4">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            {annonce.validationChef ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-orange-500" />
            )}
            <span className={annonce.validationChef ? 'text-green-600' : 'text-orange-600'}>
              Chef
            </span>
          </div>
          <div className="flex items-center gap-1">
            {annonce.validationEtablissement ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-blue-500" />
            )}
            <span className={annonce.validationEtablissement ? 'text-green-600' : 'text-blue-600'}>
              Établissement
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {noteMoyenne !== null && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Note moyenne</span>
            </div>
            <span className="text-lg font-bold text-yellow-900">{noteMoyenne.toFixed(1)}/20</span>
          </div>
        </div>
      )}

      {/* Footer avec métriques */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{annonce.vues}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{annonce.favoris}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-500">
            Chef: {annonce.chefServiceNom}
          </div>
        </div>
      </div>

      {/* Tags */}
      {annonce.tags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-1">
            {annonce.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnonceCard;