"use client";

import { X, CheckCircle, User, Building, Mail, Users, AlertTriangle, Calendar } from 'lucide-react';
import { AnnonceStage } from '../models/annonce.model';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  annonce: AnnonceStage | null;
  onValidateChef: (id: string) => void;
  onValidateEtablissement: (id: string) => void;
  onConfirmerStage: (id: string) => void;
}

const ValidationModal = ({
  isOpen,
  onClose,
  annonce,
  onValidateChef,
  onValidateEtablissement,
  onConfirmerStage
}: ValidationModalProps) => {
  if (!isOpen || !annonce) return null;

  const getDaysLeft = () => {
    const dateLimite = new Date(annonce.dateLimiteCandidature);
    const maintenant = new Date();
    const diffTime = dateLimite.getTime() - maintenant.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysLeft();
  const isReadyForValidation = annonce.placesDisponibles === 0;

  const handleValiderChef = () => {
    onValidateChef(annonce.id);
    alert('Validation du chef de service enregistrée. Notification envoyée à l\'établissement.');
  };

  const handleValiderEtablissement = () => {
    onValidateEtablissement(annonce.id);
    alert('Validation de l\'établissement enregistrée. Notification envoyée aux étudiants.');
  };

  const handleConfirmer = () => {
    onConfirmerStage(annonce.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-teal-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Validation du Stage</h3>
              <p className="text-sm text-gray-500">{annonce.titre}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations du stage */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Service</div>
              <div className="font-medium text-gray-900">{annonce.serviceNom}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Hôpital</div>
              <div className="font-medium text-gray-900">{annonce.hopitalNom}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Date limite</div>
              <div className="font-medium text-gray-900">
                {new Date(annonce.dateLimiteCandidature).toLocaleDateString('fr-FR')}
                <span className={`ml-2 text-xs ${daysLeft <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                  ({daysLeft} jours)
                </span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Places</div>
              <div className="font-medium text-gray-900">
                {annonce.placesTotal - annonce.placesDisponibles}/{annonce.placesTotal}
              </div>
            </div>
          </div>

          {/* Validation Chef de Service */}
          <div className={`p-4 rounded-xl border ${annonce.validationChef ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5" />
              <div className="flex-1">
                <h4 className="font-medium">Validation Chef de Service</h4>
                <p className="text-sm text-gray-600">Le chef de service doit valider les étudiants sélectionnés</p>
              </div>
              {annonce.validationChef ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  ✓ Validé
                </span>
              ) : (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  En attente
                </span>
              )}
            </div>
            
            {!annonce.validationChef && (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Étudiants en attente de validation</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {annonce.candidaturesAcceptees} étudiant(s) accepté(s) attendent votre validation
                  </div>
                </div>

                <button
                  onClick={handleValiderChef}
                  className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Valider les étudiants sélectionnés
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Une notification sera envoyée à l'établissement après votre validation
                </p>
              </div>
            )}
          </div>

          {/* Validation Établissement */}
          <div className={`p-4 rounded-xl border ${annonce.validationEtablissement ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5" />
              <div className="flex-1">
                <h4 className="font-medium">Validation Établissement</h4>
                <p className="text-sm text-gray-600">L'établissement valide la création du stage</p>
              </div>
              {annonce.validationEtablissement ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  ✓ Validé
                </span>
              ) : (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  En attente
                </span>
              )}
            </div>

            {annonce.validationChef && !annonce.validationEtablissement && (
              <>
                <div className="mb-4 p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Étudiants validés par le chef</span>
                  </div>
                  <div className="space-y-1">
                    {annonce.etudiantsAcceptes.map((etudiant, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Étudiant {index + 1} (ID: {etudiant})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleValiderEtablissement}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirmer la création du stage
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Après validation, les étudiants recevront une notification de confirmation
                </p>
              </>
            )}
          </div>

          {/* Confirmation finale */}
          {annonce.validationChef && annonce.validationEtablissement && (
            <div className={`p-4 rounded-xl border ${
              isReadyForValidation ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5" />
                <div className="flex-1">
                  <h4 className="font-medium">Création du Stage Actif</h4>
                  <p className="text-sm text-gray-600">
                    {isReadyForValidation 
                      ? 'Toutes les conditions sont remplies pour créer le stage'
                      : 'Toutes les places doivent être attribuées avant de créer le stage'
                    }
                  </p>
                </div>
              </div>

              {isReadyForValidation ? (
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Dates du stage</span>
                        <span className="font-medium">
                          {new Date(annonce.dateDebut).toLocaleDateString('fr-FR')} → {new Date(annonce.dateFin).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Horaire quotidien</span>
                        <span className="font-medium">
                          {annonce.horaireQuotidien.heureDebut} - {annonce.horaireQuotidien.heureFin}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Jours de travail</span>
                        <span className="font-medium">
                          {annonce.horaireQuotidien.joursTravail.length} jours/semaine
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmer}
                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Créer le Stage Actif
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Le stage sera activé et les étudiants pourront commencer à la date prévue
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Places non attribuées</p>
                      <p className="text-xs text-orange-600">
                        Il reste {annonce.placesDisponibles} place(s) disponible(s) sur {annonce.placesTotal}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Résumé des validations */}
          <div className="pt-4 border-t border-gray-200">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Résumé des validations</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Validation Chef de Service</span>
                <span className={`text-sm font-medium ${annonce.validationChef ? 'text-green-600' : 'text-orange-600'}`}>
                  {annonce.validationChef ? '✓ Complétée' : 'En attente'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Validation Établissement</span>
                <span className={`text-sm font-medium ${annonce.validationEtablissement ? 'text-green-600' : 'text-blue-600'}`}>
                  {annonce.validationEtablissement ? '✓ Complétée' : 'En attente'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Places attribuées</span>
                <span className={`text-sm font-medium ${isReadyForValidation ? 'text-green-600' : 'text-orange-600'}`}>
                  {annonce.placesTotal - annonce.placesDisponibles}/{annonce.placesTotal}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;