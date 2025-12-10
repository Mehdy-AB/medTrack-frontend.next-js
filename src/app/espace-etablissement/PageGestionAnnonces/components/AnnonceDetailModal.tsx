"use client";

import { X, Users, Calendar, Clock, MapPin, FileText, Tag, Mail, Eye, Star, Bell, Share2, Copy, CheckCircle, AlertTriangle, Award } from 'lucide-react';
import { AnnonceStage, Encadrant } from '../models/annonce.model';

interface AnnonceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  annonce: AnnonceStage | null;
  encadrants: Encadrant[];
  onChangeStatut: (statut: AnnonceStage['statut']) => void;
  onTerminer: () => void;
}

const AnnonceDetailModal = ({
  isOpen,
  onClose,
  annonce,
  encadrants,
  onChangeStatut,
  onTerminer
}: AnnonceDetailModalProps) => {
  if (!isOpen || !annonce) return null;

  const getDaysLeft = () => {
    const dateLimite = new Date(annonce.dateLimiteCandidature);
    const maintenant = new Date();
    const diffTime = dateLimite.getTime() - maintenant.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatutColor = (statut: AnnonceStage['statut']) => {
    switch (statut) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'publiée': return 'text-blue-600 bg-blue-100';
      case 'brouillon': return 'text-gray-600 bg-gray-100';
      case 'clôturée': return 'text-red-600 bg-red-100';
      case 'archivée': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatutLabel = (statut: AnnonceStage['statut']) => {
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
      case 'en_cours': return 'text-green-600 bg-green-100';
      case 'termine': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStageStatusLabel = (statutStage?: AnnonceStage['statutStage']) => {
    switch (statutStage) {
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      default: return 'Non débuté';
    }
  };

  const getNoteMoyenne = () => {
    if (!annonce.notes || annonce.notes.length === 0) return null;
    const notesValides = annonce.notes.filter(note => note !== null) as number[];
    if (notesValides.length === 0) return null;
    return notesValides.reduce((acc, note) => acc + note, 0) / notesValides.length;
  };

  const daysLeft = getDaysLeft();
  const noteMoyenne = getNoteMoyenne();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h3 className="font-semibold text-gray-900 text-xl">{annonce.titre}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                {annonce.typeStage}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(annonce.statut)}`}>
                {getStatutLabel(annonce.statut)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStageStatusColor(annonce.statutStage)}`}>
                {getStageStatusLabel(annonce.statutStage)}
              </span>
              {annonce.isNew && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  NEW
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Description
            </h4>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {annonce.description}
            </p>
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Service & Hôpital</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{annonce.serviceNom}</div>
                    <div className="text-sm text-gray-600">{annonce.hopitalNom}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Période</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Début</span>
                  <span className="font-medium text-gray-900">
                    {new Date(annonce.dateDebut).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fin</span>
                  <span className="font-medium text-gray-900">
                    {new Date(annonce.dateFin).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Durée</span>
                  <span className="font-medium text-gray-900">{annonce.dureeSemaines} semaines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date limite et capacité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Date Limite</h4>
              <div className={`p-4 rounded-xl ${
                daysLeft <= 7 ? 'bg-red-50 border border-red-200' :
                daysLeft <= 30 ? 'bg-orange-50 border border-orange-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-semibold">
                      {new Date(annonce.dateLimiteCandidature).toLocaleDateString('fr-FR')}
                    </div>
                    <div className={`text-sm font-medium ${
                      daysLeft <= 7 ? 'text-red-600' :
                      daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {daysLeft > 0 ? `${daysLeft} jours restants` : 'Expirée'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Capacité</h4>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">
                      {annonce.placesDisponibles}/{annonce.placesTotal} places disponibles
                    </div>
                    <div className="text-sm text-gray-600">
                      Taux d'occupation: {Math.round(((annonce.placesTotal - annonce.placesDisponibles) / annonce.placesTotal) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
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
            </div>
          </div>

          {/* Horaire quotidien */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Horaire Quotidien</h4>
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Heure de début</div>
                  <div className="font-medium text-gray-900">{annonce.horaireQuotidien.heureDebut}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Heure de fin</div>
                  <div className="font-medium text-gray-900">{annonce.horaireQuotidien.heureFin}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Pause déjeuner</div>
                  <div className="font-medium text-gray-900">
                    {annonce.horaireQuotidien.pauseDejeuner.heureDebut} - {annonce.horaireQuotidien.pauseDejeuner.heureFin}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Jours de travail</div>
                  <div className="font-medium text-gray-900">
                    {annonce.horaireQuotidien.joursTravail.length} jours/semaine
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {annonce.horaireQuotidien.joursTravail.map(jour => (
                  <span key={jour} className="px-2 py-1 bg-white text-teal-700 rounded text-xs">
                    {jour}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Candidatures */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Candidatures</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">{annonce.candidaturesEnAttente}</div>
                <div className="text-sm text-orange-800">En attente</div>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{annonce.candidaturesAcceptees}</div>
                <div className="text-sm text-green-800">Acceptées</div>
              </div>
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="text-2xl font-bold text-red-600">{annonce.candidaturesRefusees}</div>
                <div className="text-sm text-red-800">Refusées</div>
              </div>
            </div>
          </div>

          {/* Validations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Validations</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${annonce.validationChef ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                <div className="flex items-center gap-3">
                  {annonce.validationChef ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  )}
                  <div>
                    <div className="font-medium">Validation Chef</div>
                    <div className="text-sm">
                      {annonce.validationChef ? 'Validée' : 'En attente'}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${annonce.validationEtablissement ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
                <div className="flex items-center gap-3">
                  {annonce.validationEtablissement ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <div className="font-medium">Validation Établissement</div>
                    <div className="text-sm">
                      {annonce.validationEtablissement ? 'Validée' : 'En attente'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Encadrement */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Équipe d'Encadrement</h4>
            <div className="space-y-3">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
                <div className="font-semibold text-teal-800 mb-1">Chef de Service</div>
                <div className="text-gray-900">{annonce.chefServiceNom}</div>
              </div>
              
              {annonce.encadrants.length > 1 && (
                <div>
                  <div className="font-medium text-gray-700 mb-2">Encadrants supplémentaires</div>
                  <div className="space-y-2">
                    {annonce.encadrants
                      .filter(e => e.id !== annonce.chefServiceId)
                      .map(encadrant => (
                        <div key={encadrant.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">{encadrant.nom}</div>
                          <div className="text-sm text-gray-600">{encadrant.specialite}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags et prérequis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {annonce.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-teal-100 text-teal-800 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Prérequis</h4>
              <div className="space-y-2">
                {annonce.prerequis.map((prerequis, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">{prerequis}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spécialités requises */}
          {annonce.specialitesRequerues.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Spécialités Requises</h4>
              <div className="flex flex-wrap gap-2">
                {annonce.specialitesRequerues.map((specialite, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm"
                  >
                    {specialite}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {annonce.notes && annonce.notes.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Notes des Étudiants
              </h4>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-yellow-800">Note moyenne</div>
                    {noteMoyenne !== null && (
                      <div className="text-2xl font-bold text-yellow-900">
                        {noteMoyenne.toFixed(1)}/20
                      </div>
                    )}
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {annonce.notes.map((note, index) => (
                    <div key={index} className="p-2 bg-white rounded">
                      <div className="text-xs text-gray-500">Étudiant {index + 1}</div>
                      <div className="font-bold text-gray-900">
                        {note !== null ? `${note}/20` : 'Non noté'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Métriques */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Métriques</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <div className="text-xl font-bold text-gray-900">{annonce.vues}</div>
                </div>
                <div className="text-xs text-gray-500">Vues</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div className="text-xl font-bold text-gray-900">{annonce.favoris}</div>
                </div>
                <div className="text-xs text-gray-500">Favoris</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-xl font-bold text-gray-900">
                  {new Date(annonce.datePublication || '').toLocaleDateString('fr-FR')}
                </div>
                <div className="text-xs text-gray-500">Publication</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-xl font-bold text-gray-900">
                  {annonce.dateCloture ? new Date(annonce.dateCloture).toLocaleDateString('fr-FR') : 'Non clôturée'}
                </div>
                <div className="text-xs text-gray-500">Clôture</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              {/* Changer statut */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Statut:</span>
                <div className="flex gap-1">
                  {(['active', 'publiée', 'brouillon', 'clôturée'] as const).map(statut => (
                    <button
                      key={statut}
                      onClick={() => onChangeStatut(statut)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        annonce.statut === statut
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {getStatutLabel(statut)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions supplémentaires */}
              <div className="flex gap-2 ml-auto">
                {annonce.statutStage === 'en_cours' && (
                  <button
                    onClick={onTerminer}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Terminer le stage
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Notifier étudiants
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnonceDetailModal;